'use client';

import { useState } from 'react';
import { PORTFOLIO_TAGS, PROJECTS } from '@/lib/data';
import s from './Pages.module.css';

export default function PortfolioGrid() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tag.includes(filter));
  return (
    <>
      <div className={`container ${s.filters}`} role="group" aria-label="Filter projects">
        {PORTFOLIO_TAGS.map((tag) => (
          <button key={tag} type="button" className={s.filter} aria-pressed={filter === tag} onClick={() => setFilter(tag)}>{tag}</button>
        ))}
      </div>
      <div className="container" style={{ paddingTop: 40 }}>
        <div className={s.portfolioGrid}>
          {shown.map((p, i) => (
            <article key={p.name} className={`card ${s.project}`}>
              <div className={s.projectCover} style={{ background: p.color }}>
                <div className={`display ${s.projectMark}`}>{p.name}</div>
                <div className={`mono ${s.projectIdx}`}>{String(i + 1).padStart(2, '0')}</div>
              </div>
              <div className={s.projectBody}>
                <div className={s.projectHead}>
                  <h3 className={`display ${s.projectName}`}>{p.name}</h3>
                  <span className={`mono ${s.projectUrl}`}>{p.url}</span>
                </div>
                <div className="chip" style={{ alignSelf: 'flex-start' }}><span className="dot" />{p.tag}</div>
                <p className="muted" style={{ fontSize: 13, margin: 0 }}>{p.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
