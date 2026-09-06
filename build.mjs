/* Production build for awadhsoftware.com.
 *
 * The repo root is design-synced source: index.html loads React, ReactDOM and
 * Babel from a CDN and compiles fourteen JSX files in the visitor's browser.
 * That is right for authoring and wrong for production. This script reads the
 * same sources, compiles them ahead of time, and writes a self-contained dist/.
 *
 * Nothing here mutates the source tree, so re-syncing from Claude Design stays safe.
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as esbuild from 'esbuild';

const ROOT = process.cwd();
const OUT = join(ROOT, 'dist');
const SITE = 'https://awadhsoftware.com';

/* Authoring-only; replaced by stubs in build/runtime.js. */
const EXCLUDE = new Set(['tweaks-panel.jsx']);

/* Every field ContactPageNew posts. Netlify only records fields that appear in the
 * static form it detects at deploy time, so this list must stay in step with the
 * `form` state object in components/contact-form.jsx. */
const LEAD_FIELDS = [
  'projectType', 'industry', 'timeline', 'budget',
  'name', 'email', 'phone', 'company', 'message', 'contactPref',
];

/** The contact form is the site's only lead channel. As shipped by the design tool
 *  it showed a thank-you and discarded the brief; components/contact-form.jsx now
 *  posts to Netlify Forms. Re-syncing that file from Claude Design would quietly
 *  restore the data loss, so refuse to build rather than deploy a silent leak. */
function assertLeadCaptureIntact(code) {
  if (!code.includes('LEAD-CAPTURE') || !code.includes("'form-name': 'contact'")) {
    throw new Error(
      'components/contact-form.jsx no longer posts submissions anywhere.\n' +
        '  The lead-capture block was probably lost in a re-sync from Claude Design.\n' +
        '  Restore it before deploying, or the contact form will silently discard every brief.'
    );
  }
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 8);
const log = (...a) => console.log(...a);

/* ---------------------------------------------------------------- sources */

/** Pull the ordered JSX file list straight out of index.html so the build can
 *  never drift from what the design project actually loads. */
function scriptOrder(html) {
  const order = [];
  const re = /<script\b[^>]*type=["']text\/babel["'][^>]*src=["']([^"']+)["'][^>]*>\s*<\/script>/g;
  let m;
  while ((m = re.exec(html))) order.push(m[1]);
  return order;
}

/** The originals are separate classic <script> tags, which share one global
 *  lexical scope. Concatenating reproduces that, but a name declared twice would
 *  become a redeclaration error, so fail loudly rather than ship a broken bundle. */
function assertNoDuplicateDeclarations(files) {
  const seen = new Map();
  const dupes = [];
  const re = /^(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/gm;
  for (const { path, code } of files) {
    for (const m of code.matchAll(re)) {
      const name = m[1];
      if (seen.has(name)) dupes.push(`${name} (${seen.get(name)} and ${path})`);
      else seen.set(name, path);
    }
  }
  if (dupes.length) {
    throw new Error(`Duplicate top-level declarations across bundled files:\n  - ${dupes.join('\n  - ')}`);
  }
}

/* ------------------------------------------------------------------ images */

async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    console.warn(
      '\n  !  sharp is not installed - images will be copied unoptimised.\n' +
        '     Run `npm install` so the production build ships smaller images.\n'
    );
    return null;
  }
}

async function buildImages(sharp) {
  const srcDir = join(ROOT, 'assets');
  const outDir = join(OUT, 'assets');
  await mkdir(outDir, { recursive: true });

  const names = (await readdir(srcDir)).filter((n) => n.toLowerCase().endsWith('.png'));
  let before = 0;
  let after = 0;

  for (const name of names) {
    const input = await readFile(join(srcDir, name));
    before += input.length;
    let output = input;

    if (sharp) {
      try {
        const img = sharp(input);
        const meta = await img.metadata();
        // Nothing on the page renders wider than ~1600 CSS px, even at 2x.
        const pipeline = meta.width > 1600 ? img.resize({ width: 1600 }) : img;
        const encoded = await pipeline
          .png({ compressionLevel: 9, effort: 10, palette: true, quality: 82 })
          .toBuffer();
        if (encoded.length < input.length) output = encoded;
      } catch (err) {
        console.warn(`  !  could not optimise ${name}: ${err.message}`);
      }
    }

    after += output.length;
    await writeFile(join(outDir, name), output);
  }

  log(`  images     ${names.length} files  ${kb(before)} -> ${kb(after)}`);
}

/** Favicon and social card, generated from the brand assets at build time so the
 *  design-synced index.html never has to carry them. */
async function buildBrandArtwork(sharp) {
  if (!sharp) return { favicon: false, og: false };
  const outDir = join(OUT, 'assets');
  const navy = { r: 2, g: 21, b: 50, alpha: 1 };
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };
  let favicon = false;
  let og = false;

  try {
    const mark = await sharp(join(ROOT, 'assets', 'awadh-logo-light.png'))
      .extract({ left: 0, top: 0, width: 94, height: 94 }) // the "A" mark
      .resize(300, 300, { fit: 'contain', background: clear })
      .toBuffer();

    const sizes = [
      ['favicon.png', 64],
      ['apple-touch-icon.png', 180],
      ['icon-512.png', 512],
    ];
    for (const [file, size] of sizes) {
      const pad = Math.round(size * 0.14);
      const inner = size - pad * 2;
      const scaled = await sharp(mark).resize(inner, inner, { fit: 'contain', background: clear }).toBuffer();
      const buf = await sharp({ create: { width: size, height: size, channels: 4, background: navy } })
        .composite([{ input: scaled, top: pad, left: pad }])
        .png({ compressionLevel: 9 })
        .toBuffer();
      await writeFile(join(OUT, file), buf);
    }
    favicon = true;
  } catch (err) {
    console.warn(`  !  favicon generation failed: ${err.message}`);
  }

  try {
    // 1200x630 social card: the hero photo, darkened, with the wordmark on it.
    const base = await sharp(join(ROOT, 'assets', 'hero-fade.png'))
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .flatten({ background: navy })
      .modulate({ brightness: 0.62 })
      .toBuffer();
    const wordmark = await sharp(join(ROOT, 'assets', 'awadh-logo-light.png')).resize({ width: 520 }).toBuffer();
    const card = await sharp(base)
      .composite([{ input: wordmark, gravity: 'centre' }])
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toBuffer();
    await writeFile(join(outDir, 'og-image.jpg'), card);
    og = true;
  } catch (err) {
    console.warn(`  !  og:image generation failed: ${err.message}`);
  }

  return { favicon, og };
}

/* -------------------------------------------------------------------- html */

/** Conservative HTML minification: inline <script>/<style> bodies are pulled out
 *  and handled separately so collapsing whitespace can never corrupt them.
 *
 *  The placeholder uses U+0001, which cannot appear in real markup. A bare index
 *  would match any number on the page - the geo coordinates in the meta tags, for
 *  instance - and silently rewrite page content. */
const MARK = '\u0001';

async function minifyHtml(html) {
  const stash = [];
  const park = (s) => `${MARK}${stash.push(s) - 1}${MARK}`;

  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g, (_, attrs, body) => {
    let out = body;
    if (/application\/ld\+json/.test(attrs) && body.trim()) {
      try {
        out = JSON.stringify(JSON.parse(body));
      } catch {
        /* leave exactly as authored */
      }
    }
    return park(`<script${attrs}>${out}</script>`);
  });

  for (const m of [...html.matchAll(/<style\b([^>]*)>([\s\S]*?)<\/style>/g)]) {
    const min = (await esbuild.transform(m[2], { loader: 'css', minify: true })).code.trim();
    html = html.replace(m[0], park(`<style${m[1]}>${min}</style>`));
  }

  html = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/>\n+</g, '><')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  const restore = new RegExp(`${MARK}(\\d+)${MARK}`, 'g');
  const out = html.replace(restore, (_, i) => stash[Number(i)]);
  if (out.includes(MARK)) throw new Error('HTML minifier left an unrestored placeholder');
  return out;
}

/* ------------------------------------------------------------------- build */

async function main() {
  const started = Date.now();
  log('\nBuilding awadhsoftware.com for production\n');

  await rm(OUT, { recursive: true, force: true });
  await mkdir(join(OUT, 'assets'), { recursive: true });

  const html = await readFile(join(ROOT, 'index.html'), 'utf8');
  const order = scriptOrder(html);
  if (order.length === 0) throw new Error('No text/babel scripts found in index.html');

  const bundled = order.filter((p) => !EXCLUDE.has(p));
  const files = [];
  for (const rel of bundled) {
    files.push({ path: rel, code: await readFile(join(ROOT, rel), 'utf8') });
  }
  assertNoDuplicateDeclarations(files);
  assertLeadCaptureIntact(files.find((f) => f.path.endsWith('contact-form.jsx'))?.code ?? '');

  /* ---- javascript ---- */
  const runtime = await readFile(join(ROOT, 'build', 'runtime.js'), 'utf8');
  const entry = [
    "import * as React from 'react';",
    "import * as ReactDOMClient from 'react-dom/client';",
    'window.React = React;',
    'window.ReactDOM = ReactDOMClient;',
    runtime,
    ...files.map((f) => `\n/* ---- ${f.path} ---- */\n${f.code}`),
  ].join('\n');

  const js = await esbuild.build({
    stdin: { contents: entry, resolveDir: ROOT, loader: 'jsx', sourcefile: 'entry.jsx' },
    bundle: true,
    minify: true,
    format: 'iife',
    target: ['es2019'],
    legalComments: 'none',
    define: { 'process.env.NODE_ENV': '"production"' },
    write: false,
  });
  const jsBuf = Buffer.from(js.outputFiles[0].contents);
  const jsName = `assets/app.${hash(jsBuf)}.js`;
  await writeFile(join(OUT, jsName), jsBuf);
  log(`  javascript ${bundled.length} sources + React -> ${jsName}  ${kb(jsBuf.length)}`);

  /* ---- css ---- */
  const cssSrc = await readFile(join(ROOT, 'styles.css'), 'utf8');
  const css = (await esbuild.transform(cssSrc, { loader: 'css', minify: true })).code;
  const cssBuf = Buffer.from(css);
  const cssName = `assets/styles.${hash(cssBuf)}.css`;
  await writeFile(join(OUT, cssName), cssBuf);
  log(`  css        styles.css -> ${cssName}  ${kb(cssSrc.length)} -> ${kb(cssBuf.length)}`);

  /* ---- images + brand artwork ---- */
  const sharp = await loadSharp();
  await buildImages(sharp);
  const art = await buildBrandArtwork(sharp);

  /* ---- html ---- */
  let out = html;
  // Drop the CDN React/Babel trio and every in-browser-compiled module.
  out = out.replace(/[ \t]*<script\b[^>]*src=["']https:\/\/unpkg\.com\/[^"']+["'][^>]*>\s*<\/script>\n?/g, '');
  out = out.replace(/[ \t]*<script\b[^>]*type=["']text\/babel["'][^>]*>\s*<\/script>\n?/g, '');
  out = out.replace('<link rel="stylesheet" href="styles.css"/>', `<link rel="stylesheet" href="/${cssName}"/>`);
  if (!out.includes(cssName)) throw new Error('Could not swap the stylesheet link in index.html');

  const head = [];
  if (art.favicon) {
    head.push('<link rel="icon" href="/favicon.png" sizes="any"/>');
    head.push('<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>');
  }
  if (art.og) {
    head.push(`<meta property="og:image" content="${SITE}/assets/og-image.jpg"/>`);
    head.push('<meta property="og:image:width" content="1200"/>');
    head.push('<meta property="og:image:height" content="630"/>');
    head.push(`<meta name="twitter:image" content="${SITE}/assets/og-image.jpg"/>`);
  }
  // The hero photograph is the LCP element on every viewport.
  head.push('<link rel="preload" as="image" href="/assets/hero-fade.png" fetchpriority="high"/>');
  out = out.replace('</head>', `  ${head.join('\n  ')}\n</head>`);

  // Netlify discovers forms by parsing the deployed HTML, and this app renders its
  // form through React, so nothing would be found without a static declaration.
  // Hidden here, submitted by fetch() from components/contact-form.jsx.
  const hiddenForm =
    '<form name="contact" netlify netlify-honeypot="bot-field" hidden>' +
    '<input type="hidden" name="form-name" value="contact"/>' +
    '<input type="hidden" name="bot-field"/>' +
    LEAD_FIELDS.map((f) => `<input type="text" name="${f}"/>`).join('') +
    '</form>';
  out = out.replace('<div id="root"></div>', `${hiddenForm}\n  <div id="root"></div>`);
  if (!out.includes('name="contact"')) throw new Error('Could not inject the Netlify lead form');

  out = out.replace('</body>', `  <script src="/${jsName}" defer></script>\n</body>`);

  const htmlOut = await minifyHtml(out);
  if (htmlOut.includes('text/babel')) throw new Error('Babel script tags survived into dist/index.html');
  if (htmlOut.includes('unpkg.com')) throw new Error('CDN script tags survived into dist/index.html');
  await writeFile(join(OUT, 'index.html'), htmlOut);
  log(`  html       index.html  ${kb(html.length)} -> ${kb(htmlOut.length)}`);

  /* ---- static extras ---- */
  await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  await writeFile(
    join(OUT, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      `  <url>\n    <loc>${SITE}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n` +
      '    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n'
  );
  await writeFile(
    join(OUT, '404.html'),
    htmlOut.replace(/<title>[^<]*<\/title>/, '<title>Page not found - Awadh Software Solutions</title>')
  );
  log('  static     robots.txt, sitemap.xml, 404.html');

  /* ---- report ---- */
  let total = 0;
  const walk = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else total += (await stat(p)).size;
    }
  };
  await walk(OUT);

  log(`\n  dist/ total ${kb(total)}   built in ${((Date.now() - started) / 1000).toFixed(1)}s\n`);
}

main().catch((err) => {
  console.error('\nBuild failed:', err.message, '\n');
  process.exit(1);
});
