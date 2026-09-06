// Multi-step qualifying contact form — replaces simple form

const ContactPageNew = () => {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    projectType: '',
    industry: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    contactPref: 'Email',
  });
  const [errors, setErrors] = React.useState({});

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.projectType) e.projectType = 'Pick one to continue';
    }
    if (s === 2) {
      if (!form.industry) e.industry = 'Pick your industry';
      if (!form.timeline) e.timeline = 'Pick a timeline';
      if (!form.budget) e.budget = 'Pick a budget — even a rough one';
    }
    if (s === 3) {
      if (!form.name.trim()) e.name = 'Please share your name';
      if (!form.email.trim()) e.email = 'Email required';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Looks invalid';
      if (form.phone && !/^[+\d\s-]{7,}$/.test(form.phone)) e.phone = 'Phone format off';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const back = () => setStep(s => Math.max(1, s - 1));

  // LEAD-CAPTURE: without this the brief is thrown away and the visitor is still
  // shown a thank-you. Posts to Netlify Forms, which needs the matching hidden
  // form that build.mjs injects into dist/index.html. build.mjs fails the build if
  // this marker disappears, so a re-sync from Claude Design cannot silently
  // reintroduce the data loss.
  const [sending, setSending] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setSending(true);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      });
      if (!res.ok) throw new Error('form endpoint returned ' + res.status);
      setSubmitted(true);
    } catch (err) {
      console.error('[contact] could not submit brief', err);
      setErrors({ submit: "We couldn't send that just now. Please WhatsApp +91 70116 50803 or email info@awadhsoftwaresolutions.com." });
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <main>
        <section style={{ padding: '120px 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
            <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 16px' }}>Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h1>
            <p className="muted" style={{ fontSize: 17, marginBottom: 12 }}>
              Your <strong style={{ color: 'var(--ink)' }}>{form.projectType}</strong> brief is in. Vishnu or one of the senior team will reply via <strong style={{ color: 'var(--ink)' }}>{form.contactPref.toLowerCase()}</strong> within 24 hours.
            </p>
            <p className="muted" style={{ fontSize: 14, marginBottom: 32 }}>For anything urgent, WhatsApp is the fastest path.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/917011650803" target="_blank" rel="noreferrer" className="btn btn-accent"><Icon.WhatsApp/> WhatsApp now</a>
              <button onClick={() => { setSubmitted(false); setStep(1); setForm({ projectType: '', industry: '', timeline: '', budget: '', name: '', email: '', phone: '', company: '', message: '', contactPref: 'Email' }); }} className="btn btn-ghost">Send another</button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const Pill = ({ active, onClick, children }) => (
    <button type="button" onClick={onClick} style={{
      padding: '10px 16px', borderRadius: 999, fontSize: 14, fontWeight: 500,
      background: active ? 'var(--ink)' : 'var(--bg-2)',
      color: active ? 'var(--bg)' : 'var(--ink-2)',
      border: '1px solid ' + (active ? 'var(--ink)' : 'var(--line)'),
      transition: 'all 0.15s ease',
    }}>{children}</button>
  );

  const Card = ({ active, onClick, label, sub }) => (
    <button type="button" onClick={onClick} style={{
      padding: '18px 20px', borderRadius: 'var(--radius-lg)',
      background: active ? 'var(--accent-soft)' : 'var(--bg-2)',
      border: '1px solid ' + (active ? 'var(--accent)' : 'var(--line)'),
      textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 4,
      transition: 'all 0.15s ease', cursor: 'pointer',
    }}>
      <div style={{ fontWeight: 500, fontSize: 14 }}>{label}</div>
      {sub && <div className="muted" style={{ fontSize: 12 }}>{sub}</div>}
    </button>
  );

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
                Three quick steps. We use these answers to route you to the right person on day one — not a salesperson, the lead who'd actually do your work.
              </p>

              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { icon: 'Phone', label: 'Call', val: '+91 70116 50803', href: 'tel:+917011650803' },
                  { icon: 'WhatsApp', label: 'WhatsApp', val: 'Chat with us instantly', href: 'https://wa.me/917011650803' },
                  { icon: 'Mail', label: 'Email', val: 'info@awadhsoftwaresolutions.com', href: 'mailto:info@awadhsoftwaresolutions.com' },
                  { icon: 'Pin', label: 'Office (Ayodhya HQ)', val: 'HIG A-11, Saketpuri, Ayodhya, UP', href: '#' },
                ].map(c => {
                  const IconC = Icon[c.icon];
                  return (
                    <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
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
                <div style={{ fontSize: 13 }}><strong>Available now</strong> · Open for new work · Q2/Q3 2026</div>
              </div>
            </div>

            <form onSubmit={submit} className="card" style={{ padding: 36, alignSelf: 'flex-start' }} noValidate>
              {/* progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                {[1, 2, 3].map(n => (
                  <React.Fragment key={n}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: step >= n ? 'var(--ink)' : 'var(--bg-2)',
                      color: step >= n ? 'var(--bg)' : 'var(--ink-3)',
                      border: '1px solid ' + (step >= n ? 'var(--ink)' : 'var(--line)'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace',
                    }}>{step > n ? <Icon.Check/> : n}</div>
                    {n < 3 && <div style={{ flex: 1, height: 1, background: step > n ? 'var(--ink)' : 'var(--line)' }}/>}
                  </React.Fragment>
                ))}
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', marginLeft: 8 }}>Step {step}/3</span>
              </div>

              {/* STEP 1 — project type */}
              {step === 1 && (
                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <h2 className="display" style={{ fontSize: 24, margin: '0 0 6px', fontWeight: 600 }}>What are we building?</h2>
                    <p className="muted" style={{ fontSize: 13, margin: 0 }}>Pick the closest fit. We'll dig into specifics shortly.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="form-row">
                    {[
                      ['Web application', 'SaaS, dashboards, marketplaces'],
                      ['Mobile app', 'iOS, Android, React Native'],
                      ['AI / agentic product', 'LLM apps, RAG, agents'],
                      ['AI chatbot', 'WhatsApp, web, voice'],
                      ['Digital marketing', 'Google + Meta, lead funnels'],
                      ['SEO / LLM SEO', 'Tech SEO, GEO, content'],
                      ['Full project (build + market)', 'End-to-end engagement'],
                      ['Not sure yet', 'Tell us, we\u2019ll guide'],
                    ].map(([l, s]) => (
                      <Card key={l} active={form.projectType === l} onClick={() => update('projectType', l)} label={l} sub={s}/>
                    ))}
                  </div>
                  {errors.projectType && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.projectType}</span>}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <button type="button" onClick={next} className="btn btn-primary">Continue <Icon.Arrow/></button>
                  </div>
                </div>
              )}

              {/* STEP 2 — qualify */}
              {step === 2 && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <div>
                    <h2 className="display" style={{ fontSize: 24, margin: '0 0 6px', fontWeight: 600 }}>Quick qualifiers</h2>
                    <p className="muted" style={{ fontSize: 13, margin: 0 }}>Helps us tell you, honestly, if we're the right fit.</p>
                  </div>
                  <div className="field">
                    <label>Industry</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['Hospitality', 'Real estate', 'B2B SaaS', 'Tourism / Govt', 'Fintech / NBFC', 'Retail / DTC', 'Other'].map(o => (
                        <Pill key={o} active={form.industry === o} onClick={() => update('industry', o)}>{o}</Pill>
                      ))}
                    </div>
                    {errors.industry && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.industry}</span>}
                  </div>
                  <div className="field">
                    <label>Timeline</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['ASAP', '1–2 months', '3–6 months', '6+ months', 'Just exploring'].map(o => (
                        <Pill key={o} active={form.timeline === o} onClick={() => update('timeline', o)}>{o}</Pill>
                      ))}
                    </div>
                    {errors.timeline && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.timeline}</span>}
                  </div>
                  <div className="field">
                    <label>Budget (INR)</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['< ₹1L', '₹1L–2L', '₹2L–5L', '₹5L–10L', '₹10L–25L', '₹25L+', 'Not sure'].map(o => (
                        <Pill key={o} active={form.budget === o} onClick={() => update('budget', o)}>{o}</Pill>
                      ))}
                    </div>
                    {errors.budget && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.budget}</span>}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <button type="button" onClick={back} className="btn btn-ghost">Back</button>
                    <button type="button" onClick={next} className="btn btn-primary">Continue <Icon.Arrow/></button>
                  </div>
                </div>
              )}

              {/* STEP 3 — contact */}
              {step === 3 && (
                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <h2 className="display" style={{ fontSize: 24, margin: '0 0 6px', fontWeight: 600 }}>How do we reach you?</h2>
                    <p className="muted" style={{ fontSize: 13, margin: 0 }}>Real human reads every message, replies within 24h.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                    <div className="field">
                      <label htmlFor="f-name">Name</label>
                      <input id="f-name" className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name"/>
                      {errors.name && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="f-company">Company / Organisation</label>
                      <input id="f-company" className="input" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Optional"/>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                    <div className="field">
                      <label htmlFor="f-email">Email</label>
                      <input id="f-email" type="email" className="input" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com"/>
                      {errors.email && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.email}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="f-phone">Phone / WhatsApp</label>
                      <input id="f-phone" className="input" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 ..."/>
                      {errors.phone && <span style={{ fontSize: 12, color: 'oklch(0.55 0.2 30)' }}>{errors.phone}</span>}
                    </div>
                  </div>
                  <div className="field">
                    <label>Preferred contact</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Email', 'WhatsApp', 'Phone call'].map(o => (
                        <Pill key={o} active={form.contactPref === o} onClick={() => update('contactPref', o)}>{o}</Pill>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="f-msg">Anything else? <span style={{ textTransform: 'none', color: 'var(--ink-3)' }}>(optional)</span></label>
                    <textarea id="f-msg" className="textarea" value={form.message} onChange={e => update('message', e.target.value)} placeholder="Links, context, references…"/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <button type="button" onClick={back} className="btn btn-ghost">Back</button>
                    <button type="submit" className="btn btn-primary" disabled={sending}>
                      {sending ? 'Sending…' : 'Send brief'} <Icon.Arrow/>
                    </button>
                  </div>
                  {errors.submit && (
                    <span style={{ fontSize: 13, color: 'oklch(0.55 0.2 30)', textAlign: 'center' }}>{errors.submit}</span>
                  )}
                  <p className="mono muted" style={{ fontSize: 11, textAlign: 'center', margin: 0, letterSpacing: '0.06em' }}>
                    We'll only use this to reply. Never shared. No spam.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

window.ContactPageNew = ContactPageNew;
