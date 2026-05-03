// Services grid + capability matrix

const SERVICES = [
  {
    id: 'web', icon: 'Web', title: 'Web applications',
    desc: 'Production-grade SaaS, dashboards, marketplaces and content platforms — built on React, Next.js, Node and Postgres.',
    bullets: ['React / Next.js / Remix', 'Node.js · Python · Go', 'Postgres · Redis · Vector DBs'],
  },
  {
    id: 'mobile', icon: 'Mobile', title: 'Mobile apps · iOS &amp; Android',
    desc: 'Native and React Native apps that ship to the App Store and Play Store with the polish your users expect.',
    bullets: ['React Native · Expo', 'Swift · Kotlin', 'Realtime · Offline-first'],
  },
  {
    id: 'ai', icon: 'AI', title: 'AI / ML &amp; agentic products',
    desc: 'LLM apps, RAG pipelines, computer-use agents and bespoke models — engineered to be evaluable, observable, safe.',
    bullets: ['LLM agents · RAG · Tools', 'Fine-tuning · Evals', 'OpenAI · Anthropic · Local'],
  },
  {
    id: 'chat', icon: 'Chat', title: 'AI chatbots',
    desc: 'Customer-support, lead-gen and internal-knowledge bots that actually understand your business — connected to your data.',
    bullets: ['WhatsApp · Web · Voice', 'CRM &amp; helpdesk integrations', 'Multilingual (Hindi/English/+)'],
  },
  {
    id: 'mkt', icon: 'Megaphone', title: 'Digital marketing &amp; ads',
    desc: 'Performance campaigns on Google, Meta and YouTube — built around real attribution, not vanity metrics.',
    bullets: ['Google · Meta · YouTube', 'Landing-page CRO', 'Lead funnels &amp; attribution'],
  },
  {
    id: 'seo', icon: 'Search', title: 'SEO &amp; LLM SEO',
    desc: 'Classical SEO + generative-engine optimization, so you show up both in Google and inside ChatGPT, Gemini and Perplexity.',
    bullets: ['Tech SEO · Schema · Speed', 'Content &amp; topical authority', 'GEO / LLM-SEO playbooks'],
  },
];

const ServicesGrid = ({ setActivePage }) => {
  const { t } = useT();
  return (
    <section id="services-home" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t('svc_eyebrow')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: 0 }}>
              {t('svc_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('svc_title_em')}</em> {t('svc_title_b')}
            </h2>
          </div>
          <p className="muted" style={{ maxWidth: 380, fontSize: 16 }}>
            {t('svc_lede')}
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
          background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }} className="services-grid">
          {SERVICES.map((s, i) => {
            const IconC = Icon[s.icon];
            return (
              <button key={s.id} onClick={() => setActivePage('services')} style={{
                background: 'var(--bg)', padding: '36px 32px',
                display: 'flex', flexDirection: 'column', gap: 16,
                textAlign: 'left', minHeight: 280,
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'var(--accent-soft)', color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><IconC /></span>
                  <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 11 }}>0{i + 1}</span>
                </div>
                <h3 className="display" style={{ fontSize: 22, margin: 0, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: s.title }} />
                <p className="muted" style={{ fontSize: 14, margin: 0, flex: 1 }} dangerouslySetInnerHTML={{ __html: s.desc }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.bullets.map(b => (
                    <span key={b} style={{
                      fontSize: 11, padding: '4px 8px', borderRadius: 6,
                      background: 'var(--bg-2)', border: '1px solid var(--line)',
                      color: 'var(--ink-3)',
                    }} dangerouslySetInnerHTML={{ __html: b }} />
                  ))}
                </div>
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
