import type { Lang } from './strings';

type Bilingual = Record<Lang, string>;

export type Service = {
  id: string;
  icon: string; // /images/icon3d-*.webp
  short: Bilingual; // home-page card title
  blurb: Bilingual; // home-page card blurb
  title: string; // services-page title
  desc: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: 'web', icon: '/images/icon3d-web.webp',
    short: { en: 'Web Development', hi: 'वेब डेवलपमेंट' },
    blurb: { en: 'We build responsive, fast and secure websites tailored to your business needs.', hi: 'आपके व्यवसाय की ज़रूरतों के अनुरूप रिस्पॉन्सिव, तेज़ और सुरक्षित वेबसाइटें।' },
    title: 'Web applications',
    desc: 'Production-grade SaaS, dashboards, marketplaces and content platforms — built on React, Next.js, Node and Postgres.',
    bullets: ['React / Next.js / Remix', 'Node.js · Python · Go', 'Postgres · Redis · Vector DBs'],
  },
  {
    id: 'mobile', icon: '/images/icon3d-mobile.webp',
    short: { en: 'Mobile App Development', hi: 'मोबाइल ऐप डेवलपमेंट' },
    blurb: { en: 'Native & cross-platform mobile apps that deliver great user experiences.', hi: 'नेटिव और क्रॉस-प्लेटफ़ॉर्म मोबाइल ऐप्स जो बेहतरीन अनुभव देते हैं।' },
    title: 'Mobile apps · iOS & Android',
    desc: 'Native and React Native apps that ship to the App Store and Play Store with the polish your users expect.',
    bullets: ['React Native · Expo', 'Swift · Kotlin', 'Realtime · Offline-first'],
  },
  {
    id: 'ai', icon: '/images/icon3d-ai.webp',
    short: { en: 'AI & Cloud Solutions', hi: 'AI और क्लाउड समाधान' },
    blurb: { en: 'Scalable, secure and cost-effective AI and cloud solutions for modern businesses.', hi: 'आधुनिक व्यवसायों के लिए स्केलेबल, सुरक्षित और किफ़ायती AI व क्लाउड समाधान।' },
    title: 'AI / ML & agentic products',
    desc: 'LLM apps, RAG pipelines, computer-use agents and bespoke models — engineered to be evaluable, observable, safe.',
    bullets: ['LLM agents · RAG · Tools', 'Fine-tuning · Evals', 'OpenAI · Anthropic · Local'],
  },
  {
    id: 'chat', icon: '/images/icon3d-chat.webp',
    short: { en: 'IT Support & Maintenance', hi: 'IT सपोर्ट और मेंटेनेंस' },
    blurb: { en: 'Reliable support & maintenance to keep your business running smoothly.', hi: 'आपके व्यवसाय को सुचारु रखने के लिए भरोसेमंद सपोर्ट और मेंटेनेंस।' },
    title: 'AI chatbots',
    desc: 'Customer-support, lead-gen and internal-knowledge bots that actually understand your business — connected to your data.',
    bullets: ['WhatsApp · Web · Voice', 'CRM & helpdesk integrations', 'Multilingual (Hindi/English/+)'],
  },
  {
    id: 'mkt', icon: '/images/icon3d-mkt.webp',
    short: { en: 'Digital Marketing', hi: 'डिजिटल मार्केटिंग' },
    blurb: { en: 'Data-driven digital marketing strategies to boost your brand online.', hi: 'आपके ब्रांड को ऑनलाइन बढ़ाने के लिए डेटा-आधारित मार्केटिंग रणनीतियाँ।' },
    title: 'Digital marketing & ads',
    desc: 'Performance campaigns on Google, Meta and YouTube — built around real attribution, not vanity metrics.',
    bullets: ['Google · Meta · YouTube', 'Landing-page CRO', 'Lead funnels & attribution'],
  },
  {
    id: 'seo', icon: '/images/icon3d-seo.webp',
    short: { en: 'E-Commerce & SEO', hi: 'ई-कॉमर्स और SEO' },
    blurb: { en: 'Robust e-commerce platforms and SEO to grow your online business.', hi: 'आपके ऑनलाइन व्यवसाय को बढ़ाने के लिए मज़बूत ई-कॉमर्स प्लेटफ़ॉर्म और SEO।' },
    title: 'SEO & LLM SEO',
    desc: 'Classical SEO + generative-engine optimization, so you show up both in Google and inside ChatGPT, Gemini and Perplexity.',
    bullets: ['Tech SEO · Schema · Speed', 'Content & topical authority', 'GEO / LLM-SEO playbooks'],
  },
];

export const TECH = ['React', 'Next.js', 'Node.js', 'React Native', 'Flutter', 'Python', 'PostgreSQL', 'AWS'];

export type CaseStudy = {
  id: string; name: string; tag: string; headline: string;
  color: string; ink: string; dim: string; shot: string; url: string;
  rows: [key: 'problem' | 'solution' | 'stack' | 'outcomes', value: string][];
};

export const CASES: CaseStudy[] = [
  {
    id: 'ayodhyadham', name: 'AyodhyaDham.info', tag: 'Tourism · Govt',
    headline: 'A digital pilgrimage gateway, built for peak Ram Navami load.',
    color: '#C2610F', ink: '#FFF6EA', dim: 'rgba(255,246,234,.78)', shot: '/images/case-ayodhyadham.webp', url: 'https://ayodhyadham.info',
    rows: [
      ['problem', 'Devotees had no single portal for darshan timings, lodging and live updates — leading to crowding and missed information during peak festivals.'],
      ['solution', 'A pilgrimage portal with booking systems, virtual tours, multilingual content and live darshan/aarti updates.'],
      ['stack', 'Next.js · Node.js · Postgres · Redis · CDN edge · WhatsApp Business API'],
      ['outcomes', '12× peak-traffic capacity · 38% reduction in helpline calls · #1 ranking for "Ayodhya darshan booking"'],
    ],
  },
  {
    id: 'freeup', name: 'FreeUp.net', tag: 'Marketplace · USA',
    headline: 'A two-sided marketplace for free goods, scaled across North America.',
    color: '#3D3DDB', ink: '#F0F0FF', dim: 'rgba(240,240,255,.78)', shot: '/images/case-freeup.webp', url: 'https://freeup.net',
    rows: [
      ['problem', 'A complex multi-tier marketplace needed secure billing, role-based access, geo-fenced listings and an admin console.'],
      ['solution', 'End-to-end product build: marketplace, listings, in-app messaging, secure billing, tiered moderator access, admin dashboards.'],
      ['stack', 'React · Node.js · TypeScript · Stripe · AWS · ElasticSearch'],
      ['outcomes', '50k+ active listings · 99.95% uptime · 2-yr engagement, still iterating today'],
    ],
  },
  {
    id: 'adventureamore', name: 'AdventureAmore.com', tag: 'Travel · DTC',
    headline: 'Premium travel brand, rebuilt around conversion.',
    color: '#0B4F3C', ink: '#EDF5F1', dim: 'rgba(237,245,241,.78)', shot: '/images/case-adventureamore.webp', url: 'https://adventureamore.com',
    rows: [
      ['problem', 'Beautiful brand, weak funnel — site got traffic, but enquiries leaked at every step.'],
      ['solution', 'High-end UI/UX, mobile-first itinerary builder, multi-step lead form, WhatsApp drop-offs, paid-ads landing pages.'],
      ['stack', 'Next.js · Sanity CMS · Vercel · Meta & Google Ads · GA4'],
      ['outcomes', '4× qualified leads in 90 days · 2.6× mobile conversion · ₹0.45 cost-per-WhatsApp-lead'],
    ],
  },
];

export const TESTIMONIALS = [
  { quote: 'Vishnu and his team delivered our marketplace in 14 weeks — and stayed on for two years of iteration. They feel like our in-house team.', author: 'Founder', company: 'FreeUp · USA', initials: 'FU' },
  { quote: 'They understood our temple-trust workflow without us having to over-explain it. The donor portal handles peak Ram Navami traffic without a hiccup.', author: 'Operations head', company: 'Temple Trust · Ayodhya', initials: 'TT' },
  { quote: 'We came for a website. We left with a chatbot, paid-ads funnel and 4× more qualified leads in three months.', author: 'Marketing director', company: 'Adventure Amore · India', initials: 'AA' },
];

export type Client = { n: string; c: string; u?: string };
export const CLIENTS: Client[] = [
  { n: 'AyodhyaDham.info', c: '#C2610F', u: 'https://ayodhyadham.info' },
  { n: 'FreeUp.net', c: '#3D3DDB', u: 'https://freeup.net' },
  { n: 'Adventure Amore', c: '#0B4F3C', u: 'https://adventureamore.com' },
  { n: 'KashiTech', c: '#6B4E9E' },
  { n: 'SarayuLabs', c: '#1C5FA8' },
  { n: 'TempleTrust', c: '#A6631B' },
];

export type Project = { name: string; url: string; tag: string; blurb: string; color: string };
export const PROJECTS: Project[] = [
  { name: 'AyodhyaDham', url: 'ayodhyadham.info', tag: 'Web · Tourism · Govt', blurb: 'Pilgrimage portal connecting devotees to Ayodhya — bookings, darshan timings, and live updates.', color: '#FDEEE0' },
  { name: 'FreeUp', url: 'freeup.net', tag: 'Web · Marketplace', blurb: 'A North-American marketplace platform for free, second-hand goods. Built end-to-end.', color: '#E6E6FB' },
  { name: 'Adventure Amore', url: 'adventureamore.com', tag: 'Web · Marketing · Travel', blurb: 'Bespoke travel-experience site with itinerary builder and lead capture.', color: '#E4F1EB' },
  { name: 'KashiTech', url: 'kashitech.in', tag: 'Web · B2B SaaS', blurb: 'Operations dashboard for a logistics company in Varanasi — ETA, fleet, and dispatch.', color: '#EEE9F6' },
  { name: 'SarayuLabs', url: 'sarayulabs.ai', tag: 'AI · Internal', blurb: 'Internal RAG + agent platform for a research lab — document search across 30k+ papers.', color: '#E3ECF7' },
  { name: 'TempleTrust', url: '—', tag: 'Web · Govt · Donor', blurb: 'Donor management and darshan-pass system for a major north-Indian temple trust.', color: '#F8EBDD' },
  { name: 'NorthStar Realty', url: 'northstar.in', tag: 'Web · Real estate', blurb: 'Listing portal with drone tours and lead-routing to agents.', color: '#E2EFF3' },
  { name: 'AwadhBites', url: 'awadhbites.com', tag: 'Mobile · F&B', blurb: 'Cloud-kitchen ordering app and operator dashboard.', color: '#FBE9E3' },
  { name: 'KisaanSetu', url: 'kisaansetu.in', tag: 'AI · Agritech', blurb: 'WhatsApp chatbot in Hindi for crop advisory — used by 8,000+ farmers.', color: '#E7F3E3' },
  { name: 'Saket Cargo', url: 'saketcargo.com', tag: 'Marketing · Logistics', blurb: 'Google + Meta lead funnel for a Lucknow-based logistics SMB. 4× pipeline.', color: '#E8E8F7' },
  { name: 'BlueLotus', url: 'bluelotus.app', tag: 'Mobile · Wellness', blurb: 'Meditation app with personalised audio sessions and offline mode.', color: '#E3EDF9' },
  { name: 'AaravFinance', url: 'aaravfin.in', tag: 'Web · Fintech', blurb: 'Loan-against-property calculator + lead system for an NBFC.', color: '#F4F1DF' },
];

export const PORTFOLIO_TAGS = ['All', 'Web', 'Mobile', 'AI', 'Marketing'];

export const STATS = [
  { n: '11+', l: 'Years of experience', s: 'Founder-led since 2014' },
  { n: '50+', l: 'Projects shipped', s: 'From MVPs to enterprise' },
  { n: '8', l: 'Countries served', s: 'India, US, UK, UAE, SG, AU, CA, DE' },
  { n: '24h', l: 'Avg. first response', s: 'Real humans, not bots' },
];

export const VALUES = [
  { t: 'Sankalp · Commitment', d: 'When we say we will ship by a date, we ship. When we say a number is the budget, it is.' },
  { t: 'Satya · Honesty', d: 'We tell clients when an idea is wrong. We tell ourselves when work is not good enough yet.' },
  { t: 'Dharohar · Legacy', d: 'We build things meant to last. Code, relationships, reputation — all compound.' },
];

export const TEAM = [
  { r: 'Engineering', n: 'Full-stack · Mobile · AI/ML · DevOps' },
  { r: 'Design', n: 'Product · Brand · Motion' },
  { r: 'Growth', n: 'SEO · Performance ads · Analytics' },
  { r: 'Strategy', n: 'Founder + senior consultants' },
];
