# Awadh Software Solutions — awadhsoftware.com

Marketing site for Awadh Software Solutions, Ayodhya. React 18 rendered from a
single pre-compiled bundle, deployed on Netlify.

## Layout

| Path | What it is |
|---|---|
| `index.html`, `app.jsx`, `styles.css`, `components/*.jsx` | **Design-synced source.** Kept byte-identical to the Claude Design project. |
| `assets/` | Images the site references, at full quality. |
| `design/` | Original artwork the images in `assets/` were derived from. |
| `build.mjs`, `build/runtime.js` | Production build. Reads the source above, writes `dist/`. |
| `netlify/functions/chat.mjs` | Backend for the "Awadh AI" chat widget. |
| `test/` | Build-output and function checks. |
| `dist/` | Build output. Generated, not committed. |

The source at the repo root is authored in Claude Design and synced down. **The
build never modifies it**, so re-syncing stays safe. See "Re-syncing" below for
the one exception.

## Commands

```bash
npm install
npm run build     # writes dist/
npm test          # builds, then runs every check
npm run preview   # builds and serves dist/ on http://127.0.0.1:4173
```

## What the build does

The design project loads React, ReactDOM and Babel from a CDN and compiles
fourteen JSX files in the visitor's browser. That is right for authoring and
wrong for production. `npm run build`:

- compiles all JSX ahead of time and bundles it with React into one hashed file,
  so no Babel (about 3 MB) and no development React ever reach a visitor;
- minifies CSS and HTML, keeping inline JSON-LD and `<style>` blocks intact;
- re-encodes images (about 5.1 MB of PNG down to about 1.5 MB);
- generates the favicon, Apple touch icon and 1200x630 `og:image` from the brand
  assets, plus `robots.txt`, `sitemap.xml` and `404.html`;
- preloads the hero image, which is the Largest Contentful Paint element;
- injects the hidden static form that Netlify Forms needs;
- prerenders each route to static HTML with its own title, description, canonical
  and structured data, and emits `sitemap.xml`, `robots.txt` and `llms.txt`.

It refuses to build if the JSX files declare the same top-level name twice, or if
the lead-capture code has gone missing from the contact form.

## Deployment

Netlify builds from `netlify.toml`: `npm run build`, publish `dist`, functions in
`netlify/functions`. If the site's build settings were previously configured in
the Netlify UI, `netlify.toml` now takes precedence — worth confirming the UI is
not still set to publish the repo root.

### Contact form

Submissions post to **Netlify Forms**. Enable Forms for the site in the Netlify
UI and add a notification address, otherwise briefs are accepted and never
delivered. The field list lives in `LEAD_FIELDS` in `build.mjs` and must match
the `form` state object in `components/contact-form.jsx`.

### Chat widget

`components/chatbot.jsx` calls `window.claude.complete()`, which only exists
inside Claude's design preview. In production `build/runtime.js` points that call
at `/api/chat`, served by `netlify/functions/chat.mjs`.

The assistant runs on **Google Gemini** via `@google/genai`. Create a key at
<https://aistudio.google.com/apikey> and set `GEMINI_API_KEY` in Netlify
(Site settings → Environment variables) to switch it on. Without it the endpoint
still responds and hands the visitor to phone and email, so the widget degrades
instead of breaking.

The function defaults to `gemini-2.5-flash`, which is fast and inexpensive and
fits the ~10s Netlify function budget. Set `CHAT_MODEL` to use another model,
for example `gemini-2.5-pro` for stronger answers at higher latency and cost.
Thinking is disabled for latency; remove `thinkingConfig` in
`netlify/functions/chat.mjs` if you want the model to deliberate.

The endpoint is public and every message costs money: it caps message count and
length and pins a server-side system prompt, but consider adding rate limiting
before promoting it heavily.

## Re-syncing from Claude Design

Pull changes into the root source files as usual, then run `npm test`.

Two files carry local changes the design project does not have. Both are marked
in the source, and the build fails loudly if a re-sync removes either, so neither
regression can come back silently.

- `components/contact-form.jsx` (`LEAD-CAPTURE`) posts submissions to Netlify
  Forms. As authored by the design tool it showed a thank-you and discarded the
  brief.
- `app.jsx` (`ROUTE-SYNC`) maps each page onto a real URL. As authored, the site
  was one stateful page, so Services, Portfolio, About and Contact had no URLs
  and could not be indexed or prerendered.

## Known gaps

- `assets/team.png` is a branded placeholder, not a photograph of the team.
- `assets/case-ayodhyadham.png` is Ayodhya imagery rather than a screenshot;
  ayodhyadham.info was offline and its archived snapshot renders blank.
