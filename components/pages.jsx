// Sub-pages: Services (detail), Portfolio (full), About, Contact

const ServicesPage = ({ setActivePage }) => {
  return (
    <main>
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Services · 06 capabilities</div>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 92px)', margin: '0 0 24px' }}>
            Full-stack <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>everything</em>.<br/>
            One studio. One bill.
          </h1>
          <p className="muted" style={{ fontSize: 18, maxWidth: 640 }}>
            Pick a single service or hand us the whole arc — design, development, deployment, marketing, growth.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container" style={{ display: 'grid', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {SERVICES.map((s, i) => {
            const IconC = Icon[s.icon];
            return (
              <div key={s.id} style={{ background: 'var(--bg)', padding: '48px 40px', display: 'grid', gridTemplateColumns: '120px 1fr 1.4fr 200px', gap: 40, alignItems: 'flex-start' }} className="service-row">
                <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '0.18em' }}>0{i + 1}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconC /></span>
                  <h3 className="display" style={{ fontSize: 28, margin: 0, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: s.title }}/>
                </div>
                <div>
                  <p style={{ fontSize: 16, margin: '0 0 16px', color: 'var(--ink-2)' }} dangerouslySetInnerHTML={{ __html: s.desc }}/>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {s.bullets.map(b => (
                      <li key={b} className="chip"><Icon.Check/><span dangerouslySetInnerHTML={{ __html: b }}/></li>
                    ))}
                  </ul>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
                  <button onClick={() => setActivePage('contact')} className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>Get a quote <Icon.Arrow/></button>
                  <a href="https://wa.me/917011650803" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: 13 }}><Icon.WhatsApp/> WhatsApp</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

const PortfolioPage = ({ setActivePage }) => {
  const tags = ['All Projects', 'Web Apps', 'Mobile Apps', 'AI & Chatbot', 'Digital Marketing'];
  const [filter, setFilter] = React.useState('All Projects');
  const allProjects = [
    ...PROJECTS,
    { id: 'northstar', name: 'NorthStar Realty', url: 'northstar.in', tag: 'Web Apps · Real estate', blurb: 'Listing portal with drone tours and lead-routing to agents.' },
    { id: 'awadhbites', name: 'AwadhBites', url: 'awadhbites.com', tag: 'Mobile Apps · F&B', blurb: 'Cloud-kitchen ordering app and operator dashboard.' },
    { id: 'kisaansetu', name: 'KisaanSetu', url: 'kisaansetu.in', tag: 'AI & Chatbot · Agritech', blurb: 'WhatsApp chatbot in Hindi for crop advisory — used by 8,000+ farmers.' },
    { id: 'saketcargo', name: 'Saket Cargo', url: 'saketcargo.com', tag: 'Digital Marketing · Logistics', blurb: 'Google + Meta lead funnel for a Lucknow-based logistics SMB. 4× pipeline.' },
    { id: 'bluelotus', name: 'BlueLotus', url: 'bluelotus.app', tag: 'Mobile Apps · Wellness', blurb: 'Meditation app with personalised audio sessions and offline mode.' },
    { id: 'aaravfinance', name: 'AaravFinance', url: 'aaravfin.in', tag: 'Web Apps · Fintech', blurb: 'Loan-against-property calculator + lead system for an NBFC.' },
  ];
  const filtered = filter === 'All Projects'
    ? allProjects
    : allProjects.filter(p => p.tag.includes(filter.replace(' Apps','').replace(' & Chatbot','').replace(' Marketing','')));

  return (
    <main>
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Selected work · 12 of 50+</div>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 92px)', margin: '0 0 24px' }}>
            Things we've <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>shipped</em>.
          </h1>
          <p className="muted" style={{ fontSize: 18, maxWidth: 640, marginBottom: 32 }}>
            From Ayodhya pilgrimage portals to North-American marketplaces — a sample of the products we've built and continue to maintain.
          </p>
          <div className="filter-chips">
            {tags.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                background: filter === tag ? 'var(--accent)' : 'var(--bg-2)',
                color: filter === tag ? 'oklch(0.18 0.01 60)' : 'var(--ink-2)',
                border: '1px solid ' + (filter === tag ? 'var(--accent)' : 'var(--line)'),
                transition: 'all 0.15s ease',
              }}>{tag}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="portfolio-grid">
            {filtered.map((p) => (
              <a key={p.name}
                href={p.href || '#'}
                target={p.href ? '_blank' : undefined}
                rel={p.href ? 'noreferrer' : undefined}
                onClick={!p.href ? (e) => e.preventDefault() : undefined}
                className="card" style={{
                padding: 0, overflow: 'hidden', background: 'var(--bg-2)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px oklch(0 0 0 / 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div style={{ aspectRatio: '4/3', borderBottom: '1px solid var(--line)', overflow: 'hidden', background: 'oklch(0.18 0.04 260)' }}>
                  <ProjectMockup id={p.id || p.name.toLowerCase().replace(/ /g,'')} />
                </div>
                <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="display" style={{ fontSize: 18, margin: 0, fontWeight: 600 }}>{p.name}</h3>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{p.url}</span>
                  </div>
                  <div className="chip" style={{ alignSelf: 'flex-start' }}><span className="dot"/>{p.tag}</div>
                  <p className="muted" style={{ fontSize: 13, margin: 0 }}>{p.blurb}</p>
                  <span style={{ fontSize: 13, color: 'var(--accent-ink)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {p.href ? 'Visit site' : 'View case study'} <Icon.Arrow size={12}/>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const AboutPage = ({ setActivePage }) => (
  <main>
    <section style={{ padding: '80px 0 40px' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 16 }}>About · A studio of craftspeople</div>
        <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 92px)', margin: '0 0 32px', maxWidth: 1100 }}>
          Built in <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Ayodhya</em>.<br/>
          Trusted everywhere.
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, marginTop: 48 }} className="about-grid">
          <div>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 0 }}>
              Awadh Software Solutions started in 2014, when our founder <strong style={{ color: 'var(--ink)' }}>Vishnu Mishra</strong> shipped his first production app from a single-room office in Saketpuri. Eleven years later, that single room has become a small, focused studio — engineers, designers, marketers and SEO specialists working alongside each other.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)' }}>
              We chose to grow in Ayodhya on purpose. The discipline of this city — its rhythm, its values — shapes how we work. We don't take on more than we can do well. We tell clients honestly when an idea needs surgery. And we stay around long after launch, because most of our work is with people we've worked with for years.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="https://www.vishnumishra.com/" target="_blank" rel="noreferrer" className="btn btn-primary">Founder's portfolio <Icon.Arrow/></a>
              <a href="https://www.linkedin.com/in/cyberbaba/" target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon.Linkedin/> LinkedIn</a>
              <a href="https://github.com/vishnumishra" target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon.Github/> GitHub</a>
            </div>
          </div>
          <div className="card" style={{ padding: 32, alignSelf: 'flex-start' }}>
            <h3 className="display" style={{ fontSize: 24, margin: '0 0 20px', fontWeight: 600 }}>The team, briefly</h3>
            <div style={{ display: 'grid', gap: 14 }}>
              {[
                { r: 'Engineering', n: 'Full-stack · Mobile · AI/ML · DevOps' },
                { r: 'Design', n: 'Product · Brand · Motion' },
                { r: 'Growth', n: 'SEO · Performance ads · Analytics' },
                { r: 'Strategy', n: 'Founder + senior consultants' },
              ].map(t => (
                <div key={t.r} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.r}</div>
                  <div style={{ fontSize: 13, textAlign: 'right' }}>{t.n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <Stats />

    <section style={{ padding: '40px 0 120px' }}>
      <div className="container">
        <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '0 0 32px', maxWidth: 720 }}>
          Values that <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>shape</em> our work
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }} className="values-grid">
          {[
            { t: 'Sankalp · Commitment', d: 'When we say we will ship by a date, we ship. When we say a number is the budget, it is.' },
            { t: 'Satya · Honesty', d: 'We tell clients when an idea is wrong. We tell ourselves when work is not good enough yet.' },
            { t: 'Dharohar · Legacy', d: 'We build things meant to last. Code, relationships, reputation — all compound.' },
          ].map(v => (
            <div key={v.t} style={{ background: 'var(--bg)', padding: 32 }}>
              <h3 className="display" style={{ fontSize: 22, margin: '0 0 12px', fontWeight: 600 }}>{v.t}</h3>
              <p className="muted" style={{ fontSize: 14, margin: 0 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const ContactPage = () => {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', service: 'Web application', budget: '₹2L–5L', message: '' });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please share your name';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Looks like an invalid email';
    if (form.phone && !/^[+\d\s-]{7,}$/.test(form.phone)) e.phone = 'Phone format looks off';
    if (!form.message.trim() || form.message.length < 12) e.message = 'A line or two about your project, please';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main>
        <section style={{ padding: '120px 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
            <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 16px' }}>Message received, {form.name.split(' ')[0]}.</h1>
            <p className="muted" style={{ fontSize: 17, marginBottom: 32 }}>
              We'll get back to you within 24 hours — usually much sooner. In the meantime, feel free to message us on WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/917011650803" target="_blank" rel="noreferrer" className="btn btn-accent"><Icon.WhatsApp/> WhatsApp now</a>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: 'Web application', budget: '₹2L–5L', message: '' }); }} className="btn btn-ghost">Send another</button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section style={{ padding: '80px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80 }} className="contact-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Contact · We reply within 24h</div>
              <h1 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', margin: '0 0 24px' }}>
                Tell us about your <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>project</em>.
              </h1>
              <p className="muted" style={{ fontSize: 16, marginBottom: 32 }}>
                Or skip the form — call, WhatsApp or email. Whichever is easiest. We're a small team and a real human will read your message.
              </p>

              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { icon: 'Phone', label: 'Call', val: '+91 70116 50803', href: 'tel:+917011650803' },
                  { icon: 'WhatsApp', label: 'WhatsApp', val: 'Chat with us instantly', href: 'https://wa.me/917011650803' },
                  { icon: 'Mail', label: 'Email', val: 'info@awadhsoftwaresolutions.com', href: 'mailto:info@awadhsoftwaresolutions.com' },
                  { icon: 'Pin', label: 'Office', val: 'HIG A-11, Saketpuri, Ayodhya, UP', href: '#' },
                ].map(c => {
                  const IconC = Icon[c.icon];
                  return (
                    <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16, transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
                      <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconC/></span>
                      <div>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.label}</div>
                        <div style={{ fontSize: 15, fontWeight: 500, marginTop: 2, wordBreak: 'break-all' }}>{c.val}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="card" style={{ padding: 20, marginTop: 24, background: 'var(--bg-2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: 'oklch(0.62 0.16 150)' }}/>
                <div style={{ fontSize: 13 }}>
                  <strong>Available now</strong> · Open for new work · Q2/Q3 2026
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="card" style={{ padding: 36, display: 'grid', gap: 16, alignSelf: 'flex-start' }} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                <div className="field">
                  <label htmlFor="f-name">Your name</label>
                  <input id="f-name" className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Vishnu Mishra"/>
                  {errors.name && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" type="email" className="input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com"/>
                  {errors.email && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.email}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone / WhatsApp <span style={{ textTransform: 'none', color: 'var(--ink-3)' }}>(optional)</span></label>
                <input id="f-phone" className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 ..."/>
                {errors.phone && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.phone}</span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                <div className="field">
                  <label htmlFor="f-service">Service</label>
                  <select id="f-service" className="select" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                    {['Web application', 'Mobile app', 'AI / agentic product', 'AI chatbot', 'Digital marketing', 'SEO / LLM SEO', 'Not sure yet'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-budget">Budget (INR)</label>
                  <select id="f-budget" className="select" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
                    {['<₹1L', '₹1L–2L', '₹2L–5L', '₹5L–10L', '₹10L–25L', '₹25L+', 'Not sure'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-msg">Tell us about it</label>
                <textarea id="f-msg" className="textarea" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What are you trying to build? Who is it for?"/>
                {errors.message && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '16px 24px', marginTop: 8 }}>
                Send message <Icon.Arrow/>
              </button>
              <p className="mono muted" style={{ fontSize: 11, textAlign: 'center', margin: 0, letterSpacing: '0.06em' }}>
                We'll only use this to reply. Never shared. No spam.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

Object.assign(window, { ServicesPage, PortfolioPage, AboutPage, ContactPage });
