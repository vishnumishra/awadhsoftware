import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import { WHATSAPP_URL } from '@/lib/site';
import { Arrow, Check, WhatsApp } from '@/components/Icons';
import s from '@/components/Pages.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web applications, iOS & Android apps, AI/ML & agentic products, AI chatbots, digital marketing and SEO / LLM SEO — one studio in Ayodhya covering the whole arc.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Services · 06 capabilities</div>
          <h1 className="display">Full-stack <em className="em">everything</em>.<br />One studio. One bill.</h1>
          <p className="lede">Pick a single service or hand us the whole arc — design, development, deployment, marketing, growth.</p>
        </div>
      </section>

      <section style={{ paddingTop: 40 }}>
        <div className={`container grid-lines ${s.serviceRows}`}>
          {SERVICES.map((svc, i) => (
            <article key={svc.id} id={svc.id} className={s.serviceRow}>
              <div className={`mono ${s.num}`}>{String(i + 1).padStart(2, '0')}</div>
              <div className={s.svcHead}>
                <img src={svc.icon} alt="" width={256} height={256} loading="lazy" />
                <h2 className={`display ${s.svcTitle}`}>{svc.title}</h2>
              </div>
              <div>
                <p className={s.svcDesc}>{svc.desc}</p>
                <ul className={s.bullets}>
                  {svc.bullets.map((b) => <li key={b} className="chip"><Check size={14} />{b}</li>)}
                </ul>
              </div>
              <div className={s.svcActions}>
                <Link href="/contact/" className="btn btn-primary btn-sm">Get a quote <Arrow /></Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-wa btn-sm"><WhatsApp size={18} /> WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
