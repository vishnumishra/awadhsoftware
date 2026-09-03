'use client';

import { Fragment, useState, type ReactNode } from 'react';
import { submitLead } from '@/lib/forms';
import { WHATSAPP_URL } from '@/lib/site';
import { Arrow, Check, WhatsApp } from './Icons';
import s from './Pages.module.css';

const PROJECT_TYPES: [string, string][] = [
  ['Web application', 'SaaS, dashboards, marketplaces'],
  ['Mobile app', 'iOS, Android, React Native'],
  ['AI / agentic product', 'LLM apps, RAG, agents'],
  ['AI chatbot', 'WhatsApp, web, voice'],
  ['Digital marketing', 'Google + Meta, lead funnels'],
  ['SEO / LLM SEO', 'Tech SEO, GEO, content'],
  ['Full project (build + market)', 'End-to-end engagement'],
  ['Not sure yet', 'Tell us, we’ll guide'],
];
const INDUSTRIES = ['Hospitality', 'Real estate', 'B2B SaaS', 'Tourism / Govt', 'Fintech / NBFC', 'Retail / DTC', 'Other'];
const TIMELINES = ['ASAP', '1–2 months', '3–6 months', '6+ months', 'Just exploring'];
const BUDGETS = ['< ₹1L', '₹1L–2L', '₹2L–5L', '₹5L–10L', '₹10L–25L', '₹25L+', 'Not sure'];
const CONTACT_PREFS = ['Email', 'WhatsApp', 'Phone call'];

const EMPTY = { projectType: '', industry: '', timeline: '', budget: '', name: '', email: '', phone: '', company: '', message: '', contactPref: 'Email' };
type Form = typeof EMPTY;
type Errors = Partial<Record<keyof Form, string>>;

const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
  <button type="button" className={s.pill} aria-pressed={active} onClick={onClick}>{children}</button>
);

// Three-step qualifying brief: project type → industry/timeline/budget → contact details.
export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState<null | 'formspree' | 'whatsapp'>(null);
  const [failed, setFailed] = useState(false);

  const update = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (n: number) => {
    const e: Errors = {};
    if (n === 1 && !form.projectType) e.projectType = 'Pick one to continue';
    if (n === 2) {
      if (!form.industry) e.industry = 'Pick your industry';
      if (!form.timeline) e.timeline = 'Pick a timeline';
      if (!form.budget) e.budget = 'Pick a budget — even a rough one';
    }
    if (n === 3) {
      if (!form.name.trim()) e.name = 'Please share your name';
      if (!form.email.trim()) e.email = 'Email required';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Looks invalid';
      if (form.phone && !/^[+\d\s-]{7,}$/.test(form.phone)) e.phone = 'Phone format off';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((n) => n + 1); };
  const back = () => setStep((n) => Math.max(1, n - 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(3)) return;
    setSending(true);
    setFailed(false);
    try {
      const r = await submitLead({ _subject: `New brief: ${form.projectType}`, ...form });
      if (r.ok) setSubmitted(r.via); else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const reset = () => { setSubmitted(null); setStep(1); setForm(EMPTY); setErrors({}); };

  if (submitted) {
    return (
      <section className={s.success}>
        <div className={`container ${s.successInner}`}>
          <div className={s.successIcon}><Check size={28} /></div>
          <h1 className={`display ${s.successTitle}`}>Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h1>
          <p className="muted" style={{ fontSize: 17, marginBottom: 12 }}>
            {submitted === 'whatsapp'
              ? <>Your <strong style={{ color: 'var(--ink)' }}>{form.projectType}</strong> brief was handed to WhatsApp — hit send there and we&rsquo;ll pick it up right away.</>
              : <>Your <strong style={{ color: 'var(--ink)' }}>{form.projectType}</strong> brief is in. Vishnu or one of the senior team will reply via <strong style={{ color: 'var(--ink)' }}>{form.contactPref.toLowerCase()}</strong> within 24 hours.</>}
          </p>
          <p className="muted" style={{ fontSize: 14, marginBottom: 32 }}>For anything urgent, WhatsApp is the fastest path.</p>
          <div className={s.successBtns}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-wa"><WhatsApp /> WhatsApp now</a>
            <button type="button" onClick={reset} className="btn btn-ghost">Send another</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={submit} className={`card ${s.form}`} noValidate>
      <div className={s.progress} aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((n) => (
          <Fragment key={n}>
            <div className={`mono ${s.step} ${step >= n ? s.done : ''}`}>{step > n ? <Check size={14} /> : n}</div>
            {n < 3 && <div className={`${s.bar} ${step > n ? s.done : ''}`} />}
          </Fragment>
        ))}
        <span className={`mono ${s.stepLabel}`}>Step {step}/3</span>
      </div>

      {step === 1 && (
        <div className={s.stack}>
          <div>
            <h2 className={`display ${s.stepTitle}`}>What are we building?</h2>
            <p className={`muted ${s.stepSub}`}>Pick the closest fit. We&rsquo;ll dig into specifics shortly.</p>
          </div>
          <div className={s.cards}>
            {PROJECT_TYPES.map(([l, sub]) => (
              <button key={l} type="button" className={s.optCard} aria-pressed={form.projectType === l} onClick={() => update('projectType', l)}>
                <span className={s.l}>{l}</span>
                <span className={`muted ${s.s}`}>{sub}</span>
              </button>
            ))}
          </div>
          {errors.projectType && <span className="err" style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.projectType}</span>}
          <div className={`${s.navRow} ${s.end}`}>
            <button type="button" onClick={next} className="btn btn-primary">Continue <Arrow /></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={s.stackLg}>
          <div>
            <h2 className={`display ${s.stepTitle}`}>Quick qualifiers</h2>
            <p className={`muted ${s.stepSub}`}>Helps us tell you, honestly, if we&rsquo;re the right fit.</p>
          </div>
          {([
            ['industry', 'Industry', INDUSTRIES],
            ['timeline', 'Timeline', TIMELINES],
            ['budget', 'Budget (INR)', BUDGETS],
          ] as [keyof Form, string, string[]][]).map(([key, label, opts]) => (
            <div key={key} className="field">
              <label>{label}</label>
              <div className={s.pills}>
                {opts.map((o) => <Pill key={o} active={form[key] === o} onClick={() => update(key, o)}>{o}</Pill>)}
              </div>
              {errors[key] && <span className="err">{errors[key]}</span>}
            </div>
          ))}
          <div className={s.navRow}>
            <button type="button" onClick={back} className="btn btn-ghost">Back</button>
            <button type="button" onClick={next} className="btn btn-primary">Continue <Arrow /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={s.stack}>
          <div>
            <h2 className={`display ${s.stepTitle}`}>How do we reach you?</h2>
            <p className={`muted ${s.stepSub}`}>A real human reads every message and replies within 24h.</p>
          </div>
          <div className={s.two}>
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input id="f-name" className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" autoComplete="name" />
              {errors.name && <span className="err">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="f-company">Company / Organisation</label>
              <input id="f-company" className="input" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Optional" autoComplete="organization" />
            </div>
          </div>
          <div className={s.two}>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input id="f-email" type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" autoComplete="email" />
              {errors.email && <span className="err">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="f-phone">Phone / WhatsApp</label>
              <input id="f-phone" type="tel" className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 ..." autoComplete="tel" />
              {errors.phone && <span className="err">{errors.phone}</span>}
            </div>
          </div>
          <div className="field">
            <label>Preferred contact</label>
            <div className={s.pills}>
              {CONTACT_PREFS.map((o) => <Pill key={o} active={form.contactPref === o} onClick={() => update('contactPref', o)}>{o}</Pill>)}
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-msg">Anything else? <span style={{ textTransform: 'none', color: 'var(--ink-3)' }}>(optional)</span></label>
            <textarea id="f-msg" className="textarea" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Links, context, references…" />
          </div>
          {failed && <span className="err">Couldn&rsquo;t send just now — please try again, or WhatsApp us directly.</span>}
          <div className={s.navRow}>
            <button type="button" onClick={back} className="btn btn-ghost">Back</button>
            <button type="submit" className="btn btn-primary" disabled={sending}>{sending ? 'Sending…' : 'Send brief'} <Arrow /></button>
          </div>
          <p className={`mono muted ${s.fine}`}>We&rsquo;ll only use this to reply. Never shared. No spam.</p>
        </div>
      )}
    </form>
  );
}
