// Industry Verticals Matrix + Case Studies + Resources/Lead Magnets

const VERTICALS = [
  {
    id: 'hospitality',
    name: 'Hospitality',
    sub: 'Hotels · Resorts · Pilgrimage stays',
    desc: 'Booking engines, multilingual concierge chatbots, upsell automation, channel managers.',
    examples: ['Hotel booking chatbot (Hindi/English)', 'Direct-booking engine + payments', 'Reputation &amp; review automation'],
    icon: 'Pin',
    accent: 'oklch(0.93 0.05 60)',
  },
  {
    id: 'realestate',
    name: 'Real estate',
    sub: 'Builders · Brokers · NBFCs',
    desc: 'Lead-gen AI, listing portals with drone tours, EMI calculators, agent CRMs and call routing.',
    examples: ['AI lead qualifier (WhatsApp + Web)', 'Listing portal with virtual tours', 'Loan / EMI calculators &amp; CRM'],
    icon: 'Web',
    accent: 'oklch(0.92 0.04 200)',
  },
  {
    id: 'b2b',
    name: 'Enterprise &amp; B2B SaaS',
    sub: 'Logistics · Fintech · Operations',
    desc: 'Multi-tenant dashboards, role-based billing, complex backends, SOC-grade engineering.',
    examples: ['Operations dashboards', 'Tiered billing &amp; subscriptions', 'Internal RAG &amp; agent tools'],
    icon: 'AI',
    accent: 'oklch(0.94 0.04 300)',
  },
  {
    id: 'tourism',
    name: 'Tourism &amp; Govt',
    sub: 'Temple trusts · Tourism boards',
    desc: 'High-traffic devotee portals, donor management, darshan-pass systems, multilingual content.',
    examples: ['Pilgrimage / darshan portals', 'Donor &amp; trust management', 'Multilingual govt websites'],
    icon: 'Megaphone',
    accent: 'oklch(0.93 0.04 30)',
  },
];

const VerticalsMatrix = ({ setActivePage }) => {
  const { t } = useT();
  return (
  <section id="verticals" style={{ padding: '120px 0', position: 'relative' }}>
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 720 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{t('v_eyebrow')}</div>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: 0 }}>
            {t('v_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('v_title_em')}</em>{t('v_title_b')}
          </h2>
        </div>
        <p className="muted" style={{ maxWidth: 380, fontSize: 16 }}>
          {t('v_lede')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }} className="verticals-grid">
        {VERTICALS.map((v, i) => {
          const IconC = Icon[v.icon];
          return (
            <div key={v.id} style={{ background: 'var(--bg)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 320 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: v.accent, color: 'oklch(0.18 0.01 60)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><IconC/></div>
              <div>
                <h3 className="display" style={{ fontSize: 22, margin: '0 0 4px', fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: v.name }}/>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>{v.sub}</div>
              </div>
              <p className="muted" style={{ fontSize: 13, margin: 0 }}>{v.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 'auto 0 0', display: 'grid', gap: 8 }}>
                {v.examples.map(ex => (
                  <li key={ex} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--ink-2)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}><Icon.Check/></span>
                    <span dangerouslySetInnerHTML={{ __html: ex }}/>
                  </li>
                ))}
              </ul>
              <button onClick={() => setActivePage('contact')} style={{
                marginTop: 8, fontSize: 12, color: 'var(--accent-ink)', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 6, textAlign: 'left',
              }}>Talk to us about {v.name.replace(/&amp;/g, '&').toLowerCase()} <Icon.Arrow size={12}/></button>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

// --- CASE STUDIES with answer tables ---

const CASES = [
  {
    id: 'ayodhyadham',
    name: 'AyodhyaDham.info',
    tag: 'Tourism · Govt',
    headline: 'A digital pilgrimage gateway, built for peak Ram Navami load.',
    color: 'oklch(0.93 0.05 60)',
    rows: [
      ['Problem', 'Devotees had no single portal for darshan timings, lodging and live updates — leading to crowding and missed information during peak festivals.'],
      ['Solution', 'A pilgrimage portal with booking systems, virtual tours, multilingual content and live darshan/aarti updates.'],
      ['Stack', 'Next.js · Node.js · Postgres · Redis · CDN edge · WhatsApp Business API'],
      ['Outcomes', '12× peak-traffic capacity · 38% reduction in helpline calls · #1 ranking for "Ayodhya darshan booking"'],
    ],
  },
  {
    id: 'freeup',
    name: 'FreeUp.net',
    tag: 'Marketplace · USA',
    headline: 'A two-sided marketplace for free goods, scaled across North America.',
    color: 'oklch(0.92 0.05 150)',
    rows: [
      ['Problem', 'A complex multi-tier marketplace needed secure billing, role-based access, geo-fenced listings and an admin console.'],
      ['Solution', 'End-to-end product build: marketplace, listings, in-app messaging, secure billing, tiered moderator access, admin dashboards.'],
      ['Stack', 'React · Node.js · TypeScript · Stripe · AWS · ElasticSearch'],
      ['Outcomes', '50k+ active listings · 99.95% uptime · 2-yr engagement, still iterating today'],
    ],
  },
  {
    id: 'adventureamore',
    name: 'AdventureAmore.com',
    tag: 'Travel · DTC',
    headline: 'Premium travel brand, rebuilt around conversion.',
    color: 'oklch(0.91 0.05 230)',
    rows: [
      ['Problem', 'Beautiful brand, weak funnel — site got traffic, but enquiries leaked at every step.'],
      ['Solution', 'High-end UI/UX, mobile-first itinerary builder, multi-step lead form, WhatsApp drop-offs, paid-ads landing pages.'],
      ['Stack', 'Next.js · Sanity CMS · Vercel · Meta &amp; Google Ads · GA4'],
      ['Outcomes', '4× qualified leads in 90 days · 2.6× mobile conversion · ₹0.45 cost-per-WhatsApp-lead'],
    ],
  },
];

const CaseStudies = ({ setActivePage }) => {
  const { t } = useT();
  return (
  <section id="cases" style={{ padding: '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
    <div className="container">
      <div className="eyebrow" style={{ marginBottom: 16 }}>{t('case_eyebrow')}</div>
      <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '0 0 56px', maxWidth: 800 }}>
        {t('case_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('case_title_em')}</em> {t('case_title_b')}
      </h2>

      <div style={{ display: 'grid', gap: 24 }}>
        {CASES.map((c, i) => (
          <article key={c.id} className="card case-study" style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0 }}>
            <div style={{ background: c.color, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid var(--line)', minHeight: 280 }} className="case-cover">
              <div className="mono" style={{ fontSize: 11, color: 'oklch(0.32 0.01 60)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Case 0{i + 1} · {c.tag}</div>
              <div>
                <div className="display" style={{ fontSize: 32, fontWeight: 600, color: 'oklch(0.18 0.01 60)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>{c.name}</div>
                <p style={{ fontSize: 14, color: 'oklch(0.28 0.01 60)', margin: '12px 0 0', lineHeight: 1.5 }}>{c.headline}</p>
              </div>
            </div>
            <div style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <tbody>
                  {c.rows.map(([k, v], idx) => (
                    <tr key={k} style={{ borderBottom: idx < c.rows.length - 1 ? '1px solid var(--line)' : 'none' }}>
                      <td className="mono" style={{ width: 110, padding: '20px 24px', color: 'var(--ink-3)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{k}</td>
                      <td style={{ padding: '20px 24px', color: 'var(--ink-2)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: v }}/>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setActivePage('work')} className="btn btn-ghost">{t('case_see_all')} <Icon.Arrow/></button>
      </div>
    </div>
  </section>
  );
};

// --- RESOURCES / LEAD MAGNETS ---

const RESOURCES = [
  {
    type: 'Whitepaper',
    title: 'The Ultimate Digital Transformation Guide for Ayodhya Hotels',
    desc: '32-page playbook on booking automation, GMB, multilingual chatbots and review systems for tier-2 hospitality.',
    cta: 'Download free',
    color: 'oklch(0.93 0.05 60)',
  },
  {
    type: 'Datasheet',
    title: 'Real-Estate Marketing in Tier-2 Cities',
    desc: 'Channel mix, CPL benchmarks, and the AI lead-qualification stack we deploy for Lucknow &amp; Ayodhya builders.',
    cta: 'Get the PDF',
    color: 'oklch(0.92 0.04 200)',
  },
  {
    type: 'Playbook',
    title: 'LLM SEO &amp; GEO — A Founder\u2019s Field Guide',
    desc: 'How we get clients to show up inside ChatGPT, Gemini and Perplexity — schema, content, citations, evals.',
    cta: 'Read the guide',
    color: 'oklch(0.94 0.04 300)',
  },
];

const Resources = () => {
  const { t } = useT();
  const [email, setEmail] = React.useState('');
  const [active, setActive] = React.useState(null);
  const [done, setDone] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setDone(true);
  };

  return (
    <section id="resources" style={{ padding: '120px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t('res_eyebrow')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: 0 }}>
              {t('res_title_a')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('res_title_em')}</em>{t('res_title_b')}
            </h2>
          </div>
          <p className="muted" style={{ maxWidth: 360, fontSize: 16 }}>
            {t('res_lede')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="resources-grid">
          {RESOURCES.map((r, i) => (
            <button key={i} onClick={() => { setActive(r); setDone(false); setEmail(''); }} className="card" style={{
              padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column',
              textAlign: 'left', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ aspectRatio: '5/3', background: r.color, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 20, borderBottom: '1px solid var(--line)' }}>
                <div className="mono" style={{ position: 'absolute', top: 14, right: 14, fontSize: 10, padding: '4px 8px', borderRadius: 4, background: 'oklch(0.18 0.01 60 / 0.1)', color: 'oklch(0.18 0.01 60)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{r.type}</div>
                {/* Mock document corner */}
                <svg width="64" height="80" viewBox="0 0 64 80" style={{ position: 'absolute', bottom: -8, right: 16, opacity: 0.4 }}>
                  <rect x="4" y="4" width="56" height="72" rx="4" fill="none" stroke="oklch(0.18 0.01 60)" strokeWidth="1"/>
                  <line x1="12" y1="20" x2="52" y2="20" stroke="oklch(0.18 0.01 60)" strokeWidth="1"/>
                  <line x1="12" y1="28" x2="44" y2="28" stroke="oklch(0.18 0.01 60)" strokeWidth="1"/>
                  <line x1="12" y1="36" x2="48" y2="36" stroke="oklch(0.18 0.01 60)" strokeWidth="1"/>
                </svg>
              </div>
              <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                <h3 className="display" style={{ fontSize: 19, margin: 0, fontWeight: 600, lineHeight: 1.25 }} dangerouslySetInnerHTML={{ __html: r.title }}/>
                <p className="muted" style={{ fontSize: 13, margin: 0, flex: 1 }} dangerouslySetInnerHTML={{ __html: r.desc }}/>
                <span style={{ fontSize: 13, color: 'var(--accent-ink)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  {r.cta} <Icon.Arrow size={12}/>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Blog teasers */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <h3 className="display" style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>{t('res_journal')}</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="resources-grid">
            {[
              { d: '6 min read', t: 'How to automate hotel bookings in Ayodhya — a practical stack', cat: 'Hospitality' },
              { d: '9 min read', t: 'LLM SEO 101: getting cited by ChatGPT in your category', cat: 'Marketing' },
              { d: '12 min read', t: 'Building a WhatsApp lead-qualification agent in 2 weeks', cat: 'AI' },
            ].map((b, i) => (
              <article key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{b.cat}</span><span>{b.d}</span>
                </div>
                <h4 className="display" style={{ fontSize: 19, margin: 0, fontWeight: 600, lineHeight: 1.3 }}>{b.t}</h4>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Publishing soon</span>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Lead magnet modal */}
      {active && (
        <div onClick={() => setActive(null)} style={{
          position: 'fixed', inset: 0, zIndex: 70,
          background: 'oklch(0.18 0.01 60 / 0.55)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{
            width: 'min(480px, 100%)', padding: 32, position: 'relative',
            background: 'var(--bg)', boxShadow: 'var(--shadow-3)',
          }}>
            <button onClick={() => setActive(null)} className="btn btn-ghost" style={{ position: 'absolute', top: 12, right: 12, padding: 8, borderRadius: 8 }} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
            {!done ? (
              <>
                <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>{active.type}</div>
                <h3 className="display" style={{ fontSize: 24, margin: '0 0 12px', fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: active.title }}/>
                <p className="muted" style={{ fontSize: 14, margin: '0 0 20px' }} dangerouslySetInnerHTML={{ __html: active.desc }}/>
                <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
                  <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={{ flex: 1 }}/>
                  <button type="submit" className="btn btn-accent">Send it <Icon.Arrow/></button>
                </form>
                <p className="mono muted" style={{ fontSize: 10, marginTop: 12, letterSpacing: '0.06em' }}>One email. No drip campaign. Unsubscribe in one click.</p>
              </>
            ) : (
              <>
                <div style={{ display: 'inline-flex', width: 48, height: 48, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon.Check/>
                </div>
                <h3 className="display" style={{ fontSize: 22, margin: '0 0 8px', fontWeight: 600 }}>Sent to {email}</h3>
                <p className="muted" style={{ fontSize: 14, margin: 0 }}>Check your inbox in the next minute. If it's missing, peek in spam — and tell us so we can fix it.</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

Object.assign(window, { VERTICALS, VerticalsMatrix, CASES, CaseStudies, Resources });
