/* SEO and LLM-SEO checks on the built site.
 *
 * The two things that matter most here:
 *  - every route is a real, separately indexable page, and
 *  - the content is present in the HTML without running JavaScript, because most
 *    AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute scripts. */

import { readFileSync, existsSync } from 'node:fs';

const SITE = 'https://awadhsoftware.com';
const ROUTES = [
  ['/', 'dist/index.html'],
  ['/services', 'dist/services.html'],
  ['/work', 'dist/work.html'],
  ['/about', 'dist/about.html'],
  ['/contact', 'dist/contact.html'],
];

let failed = 0;
const check = (name, ok, note = '') => {
  if (!ok) failed++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${name}${note ? ' -> ' + note : ''}`);
};

const visibleText = (html) => {
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) || [])[1] || '';
  return body
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const titles = new Set();
const canonicals = new Set();
const bodies = new Set();

for (const [route, file] of ROUTES) {
  if (!existsSync(file)) {
    check(`${route} page exists`, false, file);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canonical = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const text = visibleText(html);

  titles.add(title);
  canonicals.add(canonical);
  bodies.add(text);

  check(`${route} has a title`, title.length > 20, `${title.length} chars`);
  check(`${route} has a meta description`, desc.length > 80 && desc.length < 320, `${desc.length} chars`);
  check(`${route} canonical is absolute and correct`, canonical === `${SITE}${route}`, canonical);
  /* The whole point of prerendering: real content without JavaScript. */
  check(`${route} is readable without JavaScript`, text.length > 2000, `${text.length} chars`);
  check(`${route} sets a base URL so relative assets resolve`, html.includes('<base href="/"'));
  check(`${route} has Open Graph url`, html.includes(`<meta property="og:url" content="${SITE}${route}"`));

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let parsed = [];
  try {
    parsed = blocks.map((b) => JSON.parse(b[1]));
  } catch (e) {
    check(`${route} structured data parses`, false, e.message);
  }
  const types = parsed.flatMap((p) => (p['@graph'] || [p]).map((n) => n['@type']));
  check(`${route} declares WebPage + WebSite`, types.includes('WebPage') && types.includes('WebSite'), types.join(','));
  if (route !== '/') {
    check(`${route} has breadcrumbs`, types.includes('BreadcrumbList'));
  } else {
    check('/ keeps the Organization + LocalBusiness + FAQ graph',
      ['Organization', 'LocalBusiness', 'ProfessionalService', 'FAQPage'].every((t) => types.includes(t)),
      types.join(','));
  }
}

check('every route has its own title', titles.size === ROUTES.length, `${titles.size} distinct`);
check('every route has its own canonical', canonicals.size === ROUTES.length, `${canonicals.size} distinct`);
check('no two routes render identical content', bodies.size === ROUTES.length, `${bodies.size} distinct`);

/* sitemap */
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check('sitemap lists every route', locs.length === ROUTES.length, `${locs.length} urls`);
for (const [route] of ROUTES) {
  check(`sitemap includes ${route}`, locs.includes(`${SITE}${route}`));
}

/* robots */
const robots = readFileSync('dist/robots.txt', 'utf8');
check('robots.txt points at the sitemap', robots.includes(`Sitemap: ${SITE}/sitemap.xml`));
check('robots.txt allows general crawling', /User-agent: \*\s*\nAllow: \//.test(robots));
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
  check(`robots.txt welcomes ${bot}`, new RegExp(`User-agent: ${bot}\\s*\\nAllow: /`).test(robots));
}

/* llms.txt - plain-text summary for answer engines */
check('llms.txt exists', existsSync('dist/llms.txt'));
if (existsSync('dist/llms.txt')) {
  const llms = readFileSync('dist/llms.txt', 'utf8');
  check('llms.txt names the company', llms.includes('Awadh Software Solutions'));
  check('llms.txt carries contact details', llms.includes('70116 50803') && llms.includes('info@awadhsoftwaresolutions.com'));
  check('llms.txt lists every page', ROUTES.every(([r]) => llms.includes(`${SITE}${r}`)));
  check('llms.txt lists the services', llms.includes('LLM SEO') && llms.includes('Mobile app development'));
}

console.log(failed ? `\n  ${failed} check(s) failed` : '\n  all SEO checks passed');
process.exit(failed ? 1 : 0);
