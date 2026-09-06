// Portfolio (logo wall + blurbs) + Stats + Testimonials + Process + CTA

const PROJECTS = [
  { name: 'AyodhyaDham', url: 'ayodhyadham.info', tag: 'Tourism · Govt', blurb: 'Pilgrimage portal connecting devotees to Ayodhya — bookings, darshan timings, and live updates.', color: 'oklch(0.93 0.05 60)' },
  { name: 'FreeUp', url: 'freeup.net', tag: 'Marketplace', blurb: 'A North-American marketplace platform for free, second-hand goods. Built end-to-end.', color: 'oklch(0.92 0.05 150)' },
  { name: 'Adventure Amore', url: 'adventureamore.com', tag: 'Travel · DTC', blurb: 'Bespoke travel-experience site with itinerary builder and lead capture.', color: 'oklch(0.91 0.05 230)' },
  { name: 'KashiTech', url: 'kashitech.in', tag: 'B2B SaaS', blurb: 'Operations dashboard for a logistics company in Varanasi — ETA, fleet, and dispatch.', color: 'oklch(0.94 0.04 300)' },
  { name: 'SarayuLabs', url: 'sarayulabs.ai', tag: 'AI · Internal', blurb: 'Internal RAG + agent platform for a research lab — document search across 30k+ papers.', color: 'oklch(0.95 0.04 80)' },
  { name: 'TempleTrust', url: '—', tag: 'Govt · Donor', blurb: 'Donor management and darshan-pass system for a major north-Indian temple trust.', color: 'oklch(0.93 0.04 30)' },
];

const Portfolio = ({ setActivePage }) => {
  const { t } = useT();
  return (
    <section id="work-home" style={{ padding: '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t('port_eyebrow')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: 0 }}>
              {t('port_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('port_title_em')}</em> {t('port_title_b')}
            </h2>
          </div>
          <button onClick={() => setActivePage('work')} className="btn btn-ghost">{t('port_view_all')} <Icon.Arrow /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="portfolio-grid">
          {PROJECTS.map((p, i) => (
            <a key={p.name} href="#" onClick={(e) => { e.preventDefault(); setActivePage('work'); }} className="card" style={{
              padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{
                aspectRatio: '4/3', background: p.color, position: 'relative',
                borderBottom: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* abstract logo mark */}
                <div className="display" style={{ fontSize: 36, fontWeight: 600, color: 'oklch(0.18 0.01 60)', letterSpacing: '-0.02em' }}>
                  {p.name}
                </div>
                <div className="mono" style={{ position: 'absolute', top: 14, right: 14, fontSize: 10, color: 'oklch(0.32 0.01 60)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>0{i + 1}</div>
                <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 6 }}>
                  {Array.from({ length: 3 }).map((_, j) => (
                    <span key={j} style={{ width: 6, height: 6, borderRadius: 3, background: 'oklch(0.18 0.01 60 / 0.4)' }}/>
                  ))}
                </div>
              </div>
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="display" style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>{p.name}</h3>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{p.url}</span>
                </div>
                <div className="chip" style={{ alignSelf: 'flex-start' }}><span className="dot"/>{p.tag}</div>
                <p className="muted" style={{ fontSize: 13, margin: 0 }}>{p.blurb}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section style={{ padding: '80px 0' }}>
    <div className="container">
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
        background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }} className="stats-grid">
        {[
          { n: '11+', l: 'Years of experience', s: 'Founder-led since 2014' },
          { n: '50+', l: 'Projects shipped', s: 'From MVPs to enterprise' },
          { n: '8', l: 'Countries served', s: 'India, US, UK, UAE, SG, AU, CA, DE' },
          { n: '24h', l: 'Avg. first response', s: 'Real humans, not bots' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '40px 28px' }}>
            <div className="display" style={{ fontSize: 56, lineHeight: 1, margin: '0 0 8px', fontWeight: 500, color: i === 0 ? 'var(--accent)' : 'var(--ink)' }}>{s.n}</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{s.l}</div>
            <div className="muted" style={{ fontSize: 12 }}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TESTIMONIALS = [
  { quote: 'Vishnu and his team delivered our marketplace in 14 weeks — and stayed on for two years of iteration. They feel like our in-house team.', author: 'Founder', company: 'FreeUp · USA', initials: 'FU' },
  { quote: 'They understood our temple-trust workflow without us having to over-explain it. The donor portal handles peak Ram Navami traffic without a hiccup.', author: 'Operations head', company: 'Temple Trust · Ayodhya', initials: 'TT' },
  { quote: 'We came for a website. We left with a chatbot, paid-ads funnel and 4× more qualified leads in three months.', author: 'Marketing director', company: 'Adventure Amore · India', initials: 'AA' },
];

const Testimonials = () => {
  const { t } = useT();
  return (
  <section style={{ padding: '120px 0', position: 'relative' }}>
    <div className="container">
      <div className="eyebrow" style={{ marginBottom: 16 }}>{t('test_eyebrow')}</div>
      <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '0 0 56px', maxWidth: 800 }}>
        {t('test_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('test_title_em')}</em> {t('test_title_b')}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="card" style={{ padding: 28, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ color: 'var(--accent)' }}>
              <path d="M0 24V14C0 6 4 1 12 0v4c-4 1-6 4-6 8h6v12H0Zm20 0V14c0-8 4-13 12-14v4c-4 1-6 4-6 8h6v12H20Z" fill="currentColor"/>
            </svg>
            <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>{t.quote}</blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--accent-soft)', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600,
              }}>{t.initials}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{t.author}</div>
                <div className="muted" style={{ fontSize: 12 }}>{t.company}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
  );
};

const Process = () => {
  const { t } = useT();
  const steps = [
    { n: '01', t: 'Discover', d: 'A 60-minute conversation. We learn your business, users and constraints. No cost, no commitment.' },
    { n: '02', t: 'Define', d: 'A short Sankalp document — scope, milestones, budget, and the success metric we are chasing.' },
    { n: '03', t: 'Design', d: 'Hi-fidelity prototypes you can click. Two rounds of feedback. We do not move on until you love it.' },
    { n: '04', t: 'Develop', d: 'Weekly demos. Production-quality code from day one. CI, tests, observability built in.' },
    { n: '05', t: 'Deploy', d: 'We launch with you, not at you. Analytics, SEO and ad infrastructure live before traffic arrives.' },
    { n: '06', t: 'Dharohar', d: 'The legacy step. We stay on for iteration, marketing and growth — most clients do.' },
  ];
  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 16 }}>{t('proc_eyebrow')}</div>
        <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '0 0 56px', maxWidth: 760 }}>
          {t('proc_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('proc_title_em')}</em> {t('proc_title_b')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }} className="process-grid">
          {steps.map(s => (
            <div key={s.n} style={{ background: 'var(--bg)', padding: 32 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: 12 }}>{s.n}</div>
              <h3 className="display" style={{ fontSize: 24, margin: '0 0 10px', fontWeight: 600 }}>{s.t}</h3>
              <p className="muted" style={{ fontSize: 14, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ setActivePage, onChatOpen }) => {
  const { t } = useT();
  return (
  <section style={{ padding: '104px 0', position: 'relative', overflow: 'hidden', marginTop: 88, backgroundImage: "linear-gradient(rgba(2,21,50,.86), rgba(2,21,50,.9)), url('assets/cta-banner.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 880 }}>
      <div className="sec-eyebrow">{t('cta_eyebrow')}</div>
      <h2 className="display" style={{ fontSize: 'clamp(30px, 4vw, 46px)', margin: '12px 0 8px', color: '#fff' }}>
        {t('cta_title_a')} <span style={{ color: 'var(--accent)' }}>{t('cta_title_em')}</span>
      </h2>
      <div className="sec-underline" style={{ marginBottom: 20 }}><span></span><span></span></div>
      <p style={{ fontSize: 16, margin: '0 auto 32px', maxWidth: 580, color: '#b9c6da' }}>
        {t('cta_lede')}
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setActivePage('contact')} className="btn btn-primary">{t('hero_cta_primary')} <Icon.Arrow /></button>
        <a href="https://wa.me/917011650803" target="_blank" rel="noreferrer" className="btn" style={{ background: '#1faa53', color: '#fff' }}><Icon.WhatsApp /> {t('cta_wa')}</a>
        <button onClick={onChatOpen} className="btn btn-ghost" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}><Icon.Spark /> {t('cta_ask_ai')}</button>
      </div>
    </div>
  </section>
  );
};

Object.assign(window, { PROJECTS, Portfolio, Stats, Testimonials, Process, FinalCTA, TESTIMONIALS });
