# Awadh Software Solutions — website

Marketing site for [awadhsoftware.com](https://awadhsoftware.com): a bilingual (English / हिन्दी), SEO- and LLM-SEO-optimised static site built with **Next.js 15 (App Router) + TypeScript**, exported to plain HTML so it can be hosted anywhere.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero, services, "Proudly based in Ayodhya" band, about, technologies, why-choose, case studies, testimonials, clients, Awadh Tech Community, CTA |
| `/services/` | Six capabilities with stack chips and quote / WhatsApp CTAs |
| `/portfolio/` | 12 projects with Web / Mobile / AI / Marketing filter |
| `/about/` | Story, team, stats, values |
| `/contact/` | Contact channels + 3-step qualifying brief |

Plus `sitemap.xml`, `robots.txt`, Open Graph image and JSON-LD (Organization, LocalBusiness, ProfessionalService, FAQPage).

## Develop

```bash
npm install
cp .env.example .env.local   # optional integrations, see below
npm run dev                  # http://localhost:3000
```

## Build & deploy

```bash
npm run build                # writes the static site to ./out
```

`out/` is a plain static site — deploy it to Vercel / Netlify / Cloudflare Pages (they auto-detect Next.js), or upload the folder to any web host (cPanel, S3 + CloudFront, nginx). Routes use trailing slashes (`/services/` → `out/services/index.html`), which every static host serves natively.

## Integrations (all optional, set at build time)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | Contact-form briefs are POSTed to `https://formspree.io/f/<id>`. Without it, the form hands the brief to WhatsApp with the message pre-filled. |
| `NEXT_PUBLIC_CHAT_ENDPOINT` | HTTPS endpoint for the "Awadh AI" chatbot. The page POSTs `{ messages: [{ role, content }], lang }` and expects `{ reply }`. Without it, the bot replies with a WhatsApp hand-off. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container for ads / analytics. |

## Editing content

- Business facts (phone, email, address, socials): `lib/site.ts`
- All UI copy in both languages: `lib/strings.ts`
- Services, case studies, projects, testimonials, clients, stats: `lib/data.ts`
- Structured data: `lib/schema.ts`
- Theme tokens (navy `#021532`, orange `#f4791f`, type scale): `app/globals.css`

## Images

Source artwork lives in the Claude Design hand-off bundle. `npm run images -- <path-to-bundle/project/assets>` regenerates `public/images/` (WebP conversion, resizing and the OG image) with `sharp`.
