// Services grid + capability matrix

const SERVICES = [
  {
    id: 'web', pic: 'icon3d-web', short: 'Web Development', blurb: 'We build responsive, fast and secure websites tailored to your business needs.', icon: 'Web', img: 'svc-web', title: 'Web applications',
    desc: 'Production-grade SaaS, dashboards, marketplaces and content platforms — built on React, Next.js, Node and Postgres.',
    bullets: ['React / Next.js / Remix', 'Node.js · Python · Go', 'Postgres · Redis · Vector DBs'],
  },
  {
    id: 'mobile', pic: 'icon3d-mobile', short: 'Mobile App Development', blurb: 'Native &amp; cross-platform mobile apps that deliver great user experiences.', icon: 'Mobile', img: 'svc-mobile', title: 'Mobile apps · iOS &amp; Android',
    desc: 'Native and React Native apps that ship to the App Store and Play Store with the polish your users expect.',
    bullets: ['React Native · Expo', 'Swift · Kotlin', 'Realtime · Offline-first'],
  },
  {
    id: 'ai', pic: 'icon3d-ai', short: 'AI &amp; Cloud Solutions', blurb: 'Scalable, secure and cost-effective AI and cloud solutions for modern businesses.', icon: 'AI', img: 'svc-cloud', title: 'AI / ML &amp; agentic products',
    desc: 'LLM apps, RAG pipelines, computer-use agents and bespoke models — engineered to be evaluable, observable, safe.',
    bullets: ['LLM agents · RAG · Tools', 'Fine-tuning · Evals', 'OpenAI · Anthropic · Local'],
  },
  {
    id: 'chat', pic: 'icon3d-chat', short: 'IT Support &amp; Maintenance', blurb: 'Reliable support &amp; maintenance to keep your business running smoothly.', icon: 'Chat', img: 'svc-support', title: 'AI chatbots',
    desc: 'Customer-support, lead-gen and internal-knowledge bots that actually understand your business — connected to your data.',
    bullets: ['WhatsApp · Web · Voice', 'CRM &amp; helpdesk integrations', 'Multilingual (Hindi/English/+)'],
  },
  {
    id: 'mkt', pic: 'icon3d-mkt', short: 'Digital Marketing', blurb: 'Data-driven digital marketing strategies to boost your brand online.', icon: 'Megaphone', img: 'svc-marketing', title: 'Digital marketing &amp; ads',
    desc: 'Performance campaigns on Google, Meta and YouTube — built around real attribution, not vanity metrics.',
    bullets: ['Google · Meta · YouTube', 'Landing-page CRO', 'Lead funnels &amp; attribution'],
  },
  {
    id: 'seo', pic: 'icon3d-seo', short: 'E-Commerce &amp; SEO', blurb: 'Robust e-commerce platforms and SEO to grow your online business.', icon: 'Search', img: 'svc-ecom', title: 'SEO &amp; LLM SEO',
    desc: 'Classical SEO + generative-engine optimization, so you show up both in Google and inside ChatGPT, Gemini and Perplexity.',
    bullets: ['Tech SEO · Schema · Speed', 'Content &amp; topical authority', 'GEO / LLM-SEO playbooks'],
  },
];

const SVC_L = {
  en: { eyebrow: 'What We Do', title: 'Services That Drive Your Business Forward', more: 'Read More' },
  hi: { eyebrow: 'हम क्या करते हैं', title: 'सेवाएँ जो आपके व्यवसाय को आगे बढ़ाएँ', more: 'और पढ़ें' },
};
const ServicesGrid = ({ setActivePage }) => {
  const { lang } = useT();
  const L = SVC_L[lang] || SVC_L.en;
  return (
    <section id="services-home" style={{ padding: '96px 0 80px', position: 'relative' }}>
      <div className="container">
        <SecHead eyebrow={L.eyebrow} title={L.title}/>
        <div className="services-grid">
          {SERVICES.map((s) => {
            return (
              <button key={s.id} onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="card svc-card">
                <img src={'assets/' + s.pic + '.png'} alt="" aria-hidden="true" style={{ width: 84, height: 84, objectFit: 'contain', display: 'block', marginBottom: 6 }}/>
                <h3 className="display" style={{ fontSize: 15, margin: 0, lineHeight: 1.3 }} dangerouslySetInnerHTML={{ __html: s.short }} />
                <p className="muted" style={{ fontSize: 12.8, margin: 0, flex: 1, lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: s.blurb }} />
                <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 12.8, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4 }}>{L.more} <Icon.Arrow/></span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.SERVICES = SERVICES;
window.ServicesGrid = ServicesGrid;
