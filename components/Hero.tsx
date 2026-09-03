'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { Arrow, Play, StatIcons } from './Icons';
import s from './Hero.module.css';

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section className={s.hero}>
      <img src="/images/hero-fade.webp" alt={h.photoAlt} width={1672} height={941} className={s.photo} fetchPriority="high" />
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <h1 className={`display ${s.title}`}>
            {h.titlePre}<span className={s.accent}>{h.titleAccent}</span>{h.titlePost}
          </h1>
          <div className={s.dashes} aria-hidden="true"><i /><i /></div>
          <p className={s.lede}>{h.lede}</p>
          <div className={s.ctas}>
            <Link href="/services/" className="btn btn-primary">{h.cta1} <Arrow /></Link>
            <Link href="/portfolio/" className="btn btn-ghost">{h.cta2} <Play /></Link>
          </div>
        </div>
        <dl className={s.stats}>
          {h.stats.map((st, i) => (
            <div key={i} className={s.stat}>
              {StatIcons[i]}
              <div>
                <dt className={`display ${s.statN}`}>{st.n}</dt>
                <dd className={s.statL} style={{ margin: 0 }}>{st.l}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
