'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { CASES, CLIENTS, SERVICES, TECH, TESTIMONIALS } from '@/lib/data';
import { SITE, WHATSAPP_URL } from '@/lib/site';
import { useChat } from './ChatProvider';
import SecHead from './SecHead';
import { Arrow, BandIcons, CheckDot, External, Quote, Spark, WhatsApp, WhyIcons } from './Icons';
import s from './Sections.module.css';

export function ServicesGrid() {
  const { t, lang } = useLang();
  return (
    <section id="services" className={s.services}>
      <div className="container">
        <SecHead eyebrow={t.services.eyebrow} title={t.services.title} />
        <div className={s.servicesGrid}>
          {SERVICES.map((svc) => (
            <Link key={svc.id} href={`/services/#${svc.id}`} className={`card ${s.svcCard}`}>
              <img src={svc.icon} alt="" width={256} height={256} className={s.svcIcon} loading="lazy" />
              <h3 className={`display ${s.svcTitle}`}>{svc.short[lang]}</h3>
              <p className={`muted ${s.svcBlurb}`}>{svc.blurb[lang]}</p>
              <span className={s.svcMore}>{t.services.more} <Arrow /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AyodhyaBand() {
  const { t } = useLang();
  return (
    <section className={s.band}>
      <img src="/images/footer-lineart.png" alt="" aria-hidden="true" className={s.bandArt} width={468} height={201} loading="lazy" />
      <div className={`container ${s.bandInner}`}>
        <div className={s.bandCopy}>
          <h2 className={`display ${s.bandTitle}`}>{t.band.based} <span>{t.band.city}</span></h2>
          <div className="sec-underline left" style={{ margin: '12px 0 14px' }}><span /><span /></div>
          <p className={s.bandBlurb}>{t.band.blurb}</p>
        </div>
        <div className={s.bandItems}>
          {t.band.items.map((it, i) => (
            <div key={i} className={s.bandItem}>
              <span className={s.ring}>{BandIcons[i]}</span>
              <div>
                <div className={s.itemT}>{it.t}</div>
                <div className={s.itemD}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutBlock() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="about" className={s.about}>
      <div className="container">
        <div className={s.aboutGrid}>
          <div className={s.collage}>
            <div className={`dot-grid ${s.dots}`} />
            <img src="/images/about-ayodhya.webp" alt={a.imgAlt} width={788} height={224} className={s.collageMain} loading="lazy" />
            <img src="/images/team.webp" alt={a.teamAlt} width={485} height={201} className={s.collageTeam} loading="lazy" />
            <div className={s.badge}>
              <div className={`display ${s.badgeN}`}>{a.badgeN}</div>
              <div className={s.badgeL}>{a.badgeL}</div>
            </div>
          </div>
          <div>
            <div className="sec-eyebrow">{a.eyebrow}</div>
            <h2 className={`display ${s.aboutTitle}`}>{a.title}</h2>
            <div className="sec-underline left" style={{ margin: '14px 0 20px' }}><span /><span /></div>
            <p className={s.aboutP}>{a.p1}</p>
            <p className={s.aboutP}>{a.p2}</p>
            <ul className={s.points}>
              {a.points.map((p) => <li key={p}><CheckDot />{p}</li>)}
            </ul>
            <Link href="/about/" className="btn btn-primary">{a.cta} <Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechRow() {
  const { t } = useLang();
  return (
    <section className={s.tech}>
      <div className="container">
        <SecHead eyebrow={t.tech.eyebrow} title={t.tech.title} style={{ marginBottom: 36 }} />
        <ul className={s.techRow} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {TECH.map((name) => <li key={name} className={`card ${s.techCard}`}>{name}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function WhyChoose() {
  const { t } = useLang();
  return (
    <section className={s.why}>
      <div className="container">
        <div className={s.whyGrid}>
          <div>
            <div className="sec-eyebrow">{t.why.eyebrow}</div>
            <h2 className={`display ${s.whyTitle}`}>{t.why.title1}<br />{t.why.title2}</h2>
            <div className="sec-underline left" style={{ marginTop: 16 }}><span /><span /></div>
          </div>
          <div className={s.whyItems}>
            {t.why.items.map((w, i) => (
              <div key={i} className={s.whyItem}>
                <span className={s.whyRing}>{WhyIcons[i]}</span>
                <div className={s.whyT}>{w.t}</div>
                <div className={s.whyD}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudies() {
  const { t } = useLang();
  const c = t.cases;
  return (
    <section id="cases" className={s.cases}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 16 }}>{c.eyebrow}</div>
        <h2 className={`display ${s.bigTitle}`}>{c.titleA} <em className="em">{c.titleEm}</em> {c.titleB}</h2>
        <div className={s.caseList}>
          {CASES.map((cs, i) => (
            <article key={cs.id} className={`card ${s.case}`}>
              <a href={cs.url} target="_blank" rel="noreferrer" className={s.cover} style={{ background: cs.color }}>
                <img src={cs.shot} alt={`${cs.name} website`} width={1400} height={700} loading="lazy" />
                <div className={s.coverBody}>
                  <div className={`mono ${s.caseTag}`} style={{ color: cs.dim }}>Case 0{i + 1} · {cs.tag}</div>
                  <div>
                    <div className={`display ${s.caseName}`} style={{ color: cs.ink }}>{cs.name}</div>
                    <p className={s.caseHeadline} style={{ color: cs.dim }}>{cs.headline}</p>
                    <span className={s.visit}>{c.visit} <External /></span>
                  </div>
                </div>
              </a>
              <table className={s.table}>
                <tbody>
                  {cs.rows.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row" className="mono">{c[k]}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
        </div>
        <div className={s.center}>
          <Link href="/portfolio/" className="btn btn-ghost">{c.seeAll} <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { t } = useLang();
  return (
    <section className={s.testimonials}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 16 }}>{t.testimonials.eyebrow}</div>
        <h2 className={`display ${s.bigTitle}`}>{t.testimonials.titleA} <em className="em">{t.testimonials.titleEm}</em> {t.testimonials.titleB}</h2>
        <div className={s.testGrid}>
          {TESTIMONIALS.map((q) => (
            <figure key={q.initials} className={`card ${s.quoteCard}`}>
              <Quote />
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                <div className={s.initials}>{q.initials}</div>
                <div>
                  <div className={s.author}>{q.author}</div>
                  <div className={`muted ${s.company}`}>{q.company}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientsStrip() {
  const { t } = useLang();
  return (
    <section className={s.clients}>
      <div className="container">
        <SecHead eyebrow={t.clients.eyebrow} title={t.clients.title} style={{ marginBottom: 36 }} />
        <div className={s.clientGrid}>
          {CLIENTS.map((cl) => {
            const style = { '--client': cl.c } as React.CSSProperties;
            return cl.u
              ? <a key={cl.n} href={cl.u} target="_blank" rel="noreferrer" className={`card ${s.client}`} style={style}>{cl.n}</a>
              : <div key={cl.n} className={`card ${s.client}`} style={style}>{cl.n}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

export function Community() {
  const { t } = useLang();
  const c = t.community;
  return (
    <section className={s.community}>
      <div className="container">
        <div className={`card ${s.communityCard}`}>
          <div className={s.communityN}>
            <div className={`display ${s.n}`}>{c.n}</div>
            <div className={s.nl}>{c.nl}</div>
          </div>
          <div className={s.communityBody}>
            <div className="sec-eyebrow">{c.eyebrow}</div>
            <h3 className={`display ${s.communityTitle}`}>{c.title}</h3>
            <p className={`muted ${s.communityBlurb}`}>{c.blurb}</p>
          </div>
          <a href={SITE.social.meetup} target="_blank" rel="noreferrer" className="btn btn-primary">{c.cta} <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { t } = useLang();
  const { setOpen } = useChat();
  return (
    <section className={s.cta}>
      <div className={`container ${s.ctaInner}`}>
        <div className="sec-eyebrow">{t.cta.eyebrow}</div>
        <h2 className={`display ${s.ctaTitle}`}>{t.cta.titleA} <span>{t.cta.titleEm}</span></h2>
        <div className="sec-underline" style={{ marginBottom: 20 }}><span /><span /></div>
        <p className={s.ctaLede}>{t.cta.lede}</p>
        <div className={s.ctaBtns}>
          <Link href="/contact/" className="btn btn-primary">{t.cta.primary} <Arrow /></Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-wa"><WhatsApp /> {t.cta.wa}</a>
          <button type="button" onClick={() => setOpen(true)} className="btn btn-outline-light"><Spark /> {t.cta.ai}</button>
        </div>
      </div>
    </section>
  );
}
