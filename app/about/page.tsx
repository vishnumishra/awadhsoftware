import type { Metadata } from 'next';
import { STATS, TEAM, VALUES } from '@/lib/data';
import { SITE } from '@/lib/site';
import { Github, Linkedin } from '@/components/Icons';
import s from '@/components/Pages.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'Founded in Ayodhya in 2014 by Vishnu Mishra, Awadh Software Solutions is a small, focused studio of engineers, designers, marketers and SEO specialists with 11+ years of experience.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>About · A studio of craftspeople</div>
          <h1 className="display" style={{ maxWidth: 1100 }}>Built in <em className="em">Ayodhya</em>.<br />Trusted everywhere.</h1>
          <div className={s.aboutGrid}>
            <div>
              <p className={s.aboutLead}>
                Awadh Software Solutions started in 2014, when our founder <strong style={{ color: 'var(--ink)' }}>{SITE.founder}</strong> shipped his first production app from a single-room office in Saketpuri. Eleven years later, that single room has become a small, focused studio — engineers, designers, marketers and SEO specialists working alongside each other.
              </p>
              <p className={s.aboutP}>
                We chose to grow in Ayodhya on purpose. The discipline of this city — its rhythm, its values — shapes how we work. We don&rsquo;t take on more than we can do well. We tell clients honestly when an idea needs surgery. And we stay around long after launch, because most of our work is with people we&rsquo;ve worked with for years.
              </p>
              <div className={s.aboutLinks}>
                <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost"><Linkedin /> Founder on LinkedIn</a>
                <a href={SITE.social.github} target="_blank" rel="noreferrer" className="btn btn-ghost"><Github /> GitHub · vishnumishra</a>
              </div>
            </div>
            <div className={`card ${s.teamCard}`}>
              <h2 className={`display ${s.teamTitle}`}>The team, briefly</h2>
              <div>
                {TEAM.map((row) => (
                  <div key={row.r} className={s.teamRow}>
                    <div className={`mono ${s.teamR}`}>{row.r}</div>
                    <div className={s.teamN}>{row.n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.stats}>
        <div className="container">
          <dl className={`grid-lines ${s.statsGrid}`} style={{ margin: 0 }}>
            {STATS.map((st, i) => (
              <div key={st.l} className={s.statCell}>
                <dt className={`display ${s.statN}`} style={{ color: i === 0 ? 'var(--accent)' : 'var(--ink)' }}>{st.n}</dt>
                <dd style={{ margin: 0 }}>
                  <div className={s.statL}>{st.l}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{st.s}</div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={s.values}>
        <div className="container">
          <h2 className={`display ${s.valuesTitle}`}>Values that <em className="em">shape</em> our work</h2>
          <div className={`grid-lines ${s.valuesGrid}`}>
            {VALUES.map((v) => (
              <div key={v.t} className={s.valueCell}>
                <h3 className="display">{v.t}</h3>
                <p className="muted" style={{ fontSize: 14, margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
