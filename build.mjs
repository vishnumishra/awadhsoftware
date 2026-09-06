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
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
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

/* The pages the app can show, their URLs, and the per-page SEO copy.
 * Flat files (services.html), not directories: with Netlify's pretty URLs a flat
 * file is served at /services directly, whereas services/index.html 301-redirects
 * to /services/ and would leave every canonical pointing at a redirect. Each one is
 * prerendered to static HTML so search engines get five indexable pages and AI
 * crawlers - which mostly do not execute JavaScript - get the real content. */
const PAGES = [
  {
    route: 'home',
    path: '/',
    file: 'index.html',
    title: 'Awadh Software Solutions — Web, Mobile, AI & Digital Marketing in Ayodhya',
    description:
      'Software development and digital marketing studio in Ayodhya, India. Web apps, iOS and Android apps, AI/ML and agentic products, AI chatbots, SEO and ad campaigns. 11+ years, 50+ projects shipped.',
  },
  {
    route: 'services',
    path: '/services',
    file: 'services.html',
    title: 'Services — Web, Mobile, AI, Chatbots, SEO & Ads · Awadh Software Solutions',
    description:
      'Six capabilities under one roof: web applications, iOS and Android apps, AI/ML and agentic products, AI chatbots, digital marketing, and SEO including LLM SEO. Built in Ayodhya for clients worldwide.',
  },
  {
    route: 'work',
    path: '/work',
    file: 'work.html',
    title: 'Portfolio — 50+ Projects Shipped · Awadh Software Solutions',
    description:
      'Selected work from Awadh Software Solutions: AyodhyaDham pilgrimage portal, the FreeUp marketplace, Adventure Amore, plus real estate, agritech, fintech and logistics projects.',
  },
  {
    route: 'about',
    path: '/about',
    file: 'about.html',
    title: 'About — A Software Studio in Ayodhya Since 2014 · Awadh Software Solutions',
    description:
      'Founded in 2014 by Vishnu Mishra, Awadh Software Solutions is a studio of engineers, designers, marketers and SEO specialists in Ayodhya, Uttar Pradesh, serving clients in 8+ countries.',
  },
  {
    route: 'contact',
    path: '/contact',
    file: 'contact.html',
    title: 'Contact — Start a Project · Awadh Software Solutions',
    description:
      'Tell us about your project. Call or WhatsApp +91 70116 50803, email info@awadhsoftwaresolutions.com, or send a brief. A real person replies within 24 hours.',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Per-page structured data. The home page already carries the Organization,
 *  LocalBusiness, ProfessionalService and FAQPage graph from index.html; every page
 *  additionally gets a WebPage node, and subpages get breadcrumbs so search results
 *  show the hierarchy. */
function pageSchema(page) {
  const url = `${SITE}${page.path === '/' ? '/' : page.path}`;
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#org` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'Awadh Software Solutions',
      publisher: { '@id': `${SITE}/#org` },
      inLanguage: ['en-IN', 'hi-IN'],
    },
  ];
  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: page.title.split(/ [-—] /)[0], item: url },
      ],
    });
  }
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  return `<script type="application/ld+json">${json}</script>`;
}

/** Routing is what turns one stateful page into five indexable URLs. If a re-sync
 *  from Claude Design drops it, every subpage silently becomes unreachable again
 *  and the prerender collapses to five copies of the home page. */
function assertRoutingIntact(code) {
  if (!code.includes('ROUTE-SYNC') || !code.includes('pageFromPath')) {
    throw new Error(
      'app.jsx no longer maps pages to URLs.\n' +
        '  The ROUTE-SYNC block was probably lost in a re-sync from Claude Design.\n' +
        '  Without it Services / Portfolio / About / Contact have no URLs and cannot be indexed.'
    );
  }
}

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

/* --------------------------------------------------------------- prerender */

/** Builds a Node-side copy of the app and returns render(pathname) -> HTML string.
 *
 *  The component files were written for classic <script> tags: they assign to
 *  `window` at module scope and app.jsx mounts a React root on import. So the
 *  bundle gets a minimal DOM surface and a no-op createRoot, and exports a render
 *  function that drives the real component tree through react-dom/server. */
async function buildRenderer(files, runtime) {
  const prelude = `
import * as React from 'react';
// server.browser, not server: renderToString needs no Node streams, and the plain
// entry drags in CommonJS stream internals that cannot be bundled to ESM.
import { renderToString } from 'react-dom/server.browser';

const stubEl = { style: {}, setAttribute() {}, removeAttribute() {}, appendChild() {}, removeChild() {}, addEventListener() {}, removeEventListener() {} };
// Some of these already exist on modern Node and are read-only (navigator), so
// define defensively rather than assigning.
const put = (key, value) => {
  try { Object.defineProperty(globalThis, key, { value, writable: true, configurable: true }); }
  catch { /* keep whatever Node already provides */ }
};
put('window', globalThis);
put('location', { pathname: '/', search: '', hash: '', href: '${SITE}/' });
put('history', { pushState() {}, replaceState() {} });
put('document', {
  documentElement: stubEl, body: stubEl, title: '',
  getElementById: () => stubEl, createElement: () => stubEl,
  querySelector: () => null, querySelectorAll: () => [],
  addEventListener() {}, removeEventListener() {},
});
put('addEventListener', () => {});
put('removeEventListener', () => {});
put('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));

window.React = React;
window.ReactDOM = { createRoot: () => ({ render() {}, unmount() {} }) };
`;
  const epilogue = `
export function renderPage(pathname) {
  globalThis.location = { ...globalThis.location, pathname, href: '${SITE}' + pathname };
  return renderToString(React.createElement(App));
}
`;
  const entry = [prelude, runtime, ...files.map((f) => `\n/* ---- ${f.path} ---- */\n${f.code}`), epilogue].join('\n');

  const outfile = join(ROOT, 'node_modules', '.cache', 'awadh-ssr.mjs');
  await mkdir(dirname(outfile), { recursive: true });
  await esbuild.build({
    stdin: { contents: entry, resolveDir: ROOT, loader: 'jsx', sourcefile: 'ssr-entry.jsx' },
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: ['node20'],
    define: { 'process.env.NODE_ENV': '"production"' },
    outfile,
  });

  const mod = await import(pathToFileURL(outfile).href + `?v=${Date.now()}`);
  return mod.renderPage;
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
  assertRoutingIntact(files.find((f) => f.path === 'app.jsx')?.code ?? '');

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

  // Asset paths in the components are relative ("assets/hero-fade.png"). Now that
  // pages live at /services, /work and so on, those would resolve against the
  // subdirectory and 404. A base URL fixes both the prerendered markup and the
  // paths the client builds at runtime, without touching the design-synced source.
  out = out.replace('<meta charset="utf-8"/>', '<meta charset="utf-8"/>\n  <base href="/"/>');
  if (!out.includes('<base href="/"/>')) throw new Error('Could not insert the base URL');

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

  /* ---- prerender one static page per route ---- */
  const renderPage = await buildRenderer(files, runtime);
  const shell = out;
  let htmlOut = null;
  let renderedTotal = 0;

  for (const page of PAGES) {
    const url = `${SITE}${page.path === '/' ? '/' : page.path}`;
    const appHtml = renderPage(page.path);
    renderedTotal += appHtml.length;

    let doc = shell
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
      .replace(/<meta name="description" content="[\s\S]*?"\/>/, `<meta name="description" content="${esc(page.description)}"/>`)
      .replace(/<link rel="canonical" href="[^"]*"\/>/, `<link rel="canonical" href="${url}"/>`)
      .replace(/<meta property="og:url" content="[^"]*"\/>/, `<meta property="og:url" content="${url}"/>`)
      .replace(/<meta property="og:title" content="[\s\S]*?"\/>/, `<meta property="og:title" content="${esc(page.title)}"/>`)
      .replace(/<meta property="og:description" content="[\s\S]*?"\/>/, `<meta property="og:description" content="${esc(page.description)}"/>`)
      .replace(/<meta name="twitter:title" content="[\s\S]*?"\/>/, `<meta name="twitter:title" content="${esc(page.title)}"/>`)
      .replace(/<meta name="twitter:description" content="[\s\S]*?"\/>/, `<meta name="twitter:description" content="${esc(page.description)}"/>`);

    // Seed #root so the content exists before any JavaScript runs.
    doc = doc.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    if (!doc.includes(appHtml.slice(0, 60))) throw new Error(`Prerendered markup did not land in ${page.file}`);

    doc = doc.replace('</head>', `  ${pageSchema(page)}\n</head>`);

    const minified = await minifyHtml(doc);
    if (minified.includes('text/babel')) throw new Error('Babel script tags survived into the build');
    if (minified.includes('unpkg.com')) throw new Error('CDN script tags survived into the build');

    await mkdir(dirname(join(OUT, page.file)), { recursive: true });
    await writeFile(join(OUT, page.file), minified);
    if (page.route === 'home') htmlOut = minified;
  }

  log(`  html       ${PAGES.length} prerendered pages  ${kb(renderedTotal / PAGES.length)} avg markup each`);

  /* ---- static extras ---- */
  const today = new Date().toISOString().slice(0, 10);

  // Explicitly welcome the AI crawlers: this site sells LLM SEO, so being readable
  // by answer engines is the point.
  await writeFile(
    join(OUT, 'robots.txt'),
    'User-agent: *\nAllow: /\n\n' +
      '# Answer engines and AI crawlers are welcome.\n' +
      ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'meta-externalagent', 'Amazonbot', 'cohere-ai', 'YouBot', 'DuckAssistBot']
        .map((ua) => `User-agent: ${ua}\nAllow: /\n`)
        .join('\n') +
      `\nSitemap: ${SITE}/sitemap.xml\n`
  );

  await writeFile(
    join(OUT, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      PAGES.map(
        (p) =>
          `  <url>\n    <loc>${SITE}${p.path === '/' ? '/' : p.path}</loc>\n    <lastmod>${today}</lastmod>\n` +
          `    <changefreq>monthly</changefreq>\n    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
      ).join('\n') +
      '\n</urlset>\n'
  );

  // llms.txt: an emerging convention giving answer engines a clean, plain-text
  // summary of the site instead of making them infer it from rendered markup.
  await writeFile(
    join(OUT, 'llms.txt'),
    `# Awadh Software Solutions\n\n` +
      `> Software development and digital marketing studio in Ayodhya, Uttar Pradesh, India. ` +
      `Founded in 2014 by Vishnu Mishra. 11+ years, 50+ projects shipped for clients in 8+ countries.\n\n` +
      `Contact: +91 70116 50803 (phone and WhatsApp), info@awadhsoftwaresolutions.com, HIG A-11 Saketpuri, Ayodhya, Uttar Pradesh, India.\n\n` +
      `## Services\n\n` +
      `- Web application development (React, Next.js, Node.js, Postgres)\n` +
      `- Mobile app development for iOS and Android (React Native, Swift, Kotlin)\n` +
      `- AI/ML and agentic product development (LLM apps, RAG pipelines, evaluations)\n` +
      `- AI chatbot development (WhatsApp, web, voice; multilingual Hindi and English)\n` +
      `- Digital marketing (Google, Meta and YouTube campaigns, landing-page CRO)\n` +
      `- SEO and LLM SEO / generative engine optimisation\n\n` +
      `## Pages\n\n` +
      PAGES.map((p) => `- [${p.title.split(/ [-—] /)[0]}](${SITE}${p.path === '/' ? '/' : p.path}): ${p.description}`).join('\n') +
      `\n\n## Selected work\n\n` +
      `- AyodhyaDham.info: pilgrimage portal with darshan timings, bookings and live updates\n` +
      `- FreeUp.net: two-sided North American marketplace, built end to end\n` +
      `- AdventureAmore.com: premium travel brand rebuilt around conversion\n\n` +
      `## Service area\n\n` +
      `Ayodhya, Lucknow, Uttar Pradesh, all of India, and international clients.\n`
  );

  await writeFile(
    join(OUT, '404.html'),
    htmlOut.replace(/<title>[^<]*<\/title>/, '<title>Page not found - Awadh Software Solutions</title>')
  );
  log(`  static     robots.txt, sitemap.xml (${PAGES.length} urls), llms.txt, 404.html`);

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
