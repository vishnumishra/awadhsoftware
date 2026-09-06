/* Checks the artefacts in dist/ that a browser and the crawlers actually depend on.
   Run after `npm run build`. */

import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const results = [];
const check = (name, ok) => results.push([name, !!ok]);

/* The whole point of the build: no in-browser compilation, no CDN React. */
check('no Babel standalone', !html.includes('text/babel'));
check('no unpkg CDN scripts', !html.includes('unpkg.com'));
check('hashed JS bundle linked', /<script src="\/assets\/app\.[0-9a-f]{8}\.js" defer>/.test(html));
check('hashed CSS linked', /assets\/styles\.[0-9a-f]{8}\.css/.test(html));

/* The minifier parks inline script/style bodies; a leftover marker means it broke. */
check('no unrestored placeholder', !html.includes(''));

/* Content the minifier has previously been able to corrupt. */
check('geo.position intact', html.includes('content="26.7922;82.1998"'));
check('ICBM intact', html.includes('content="26.7922, 82.1998"'));
check('telephone intact', html.includes('+91-7011650803'));
check('LLM summary block kept', html.includes('llm-only'));

/* Structured data drives the rich result, so it has to survive minification. */
const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
let ldOk = false;
try {
  ldOk = ld && JSON.parse(ld[1])['@graph'].length === 4;
} catch {
  ldOk = false;
}
check('ld+json parses with 4 graph entries', ldOk);

/* Netlify detects forms by parsing deployed HTML; without this the contact form
   posts into the void. Field list must match components/contact-form.jsx. */
const form = html.match(/<form name="contact"[\s\S]*?<\/form>/);
check('hidden Netlify form present', !!form);
if (form) {
  const names = [...form[0].matchAll(/name="([^"]+)"/g)].map((m) => m[1]);
  for (const f of ['form-name', 'projectType', 'industry', 'timeline', 'budget', 'name', 'email', 'phone', 'company', 'message', 'contactPref']) {
    check(`form field "${f}"`, names.includes(f));
  }
}

/* Production polish that index.html cannot carry itself. */
check('favicon linked', html.includes('/favicon.png'));
check('og:image linked', html.includes('og-image.jpg'));
check('hero preloaded for LCP', html.includes('rel="preload" as="image"'));

for (const f of ['dist/favicon.png', 'dist/apple-touch-icon.png', 'dist/assets/og-image.jpg', 'dist/robots.txt', 'dist/sitemap.xml', 'dist/404.html']) {
  check(`${f} emitted`, existsSync(f));
}

/* Every image the app references must exist in dist/assets. */
const sources = ['index.html', 'app.jsx', 'styles.css']
  .concat(['chatbot', 'contact-form', 'funnel', 'hero', 'home-blocks', 'i18n', 'icons', 'layout', 'pages', 'sections', 'services'].map((n) => `components/${n}.jsx`))
  .map((p) => readFileSync(p, 'utf8'))
  .join('\n');
const referenced = new Set([
  ...[...sources.matchAll(/assets\/([a-z0-9-]+)\.png/g)].map((m) => m[1]),
  ...[...sources.matchAll(/pic: '([a-z0-9-]+)'/g)].map((m) => m[1]),
  ...[...sources.matchAll(/shot: '([a-z0-9-]+)'/g)].map((m) => m[1]),
]);
for (const name of referenced) {
  check(`image assets/${name}.png shipped`, existsSync(`dist/assets/${name}.png`));
}

let failed = 0;
for (const [name, ok] of results) {
  if (!ok) failed++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${name}`);
}
console.log(failed ? `\n  ${failed} of ${results.length} checks failed` : `\n  all ${results.length} checks passed`);
process.exit(failed ? 1 : 0);
