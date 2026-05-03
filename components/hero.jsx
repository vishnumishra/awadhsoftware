// Hero + Marquee + Stats

const Hero = ({ setActivePage, onChatOpen }) => {
  const { t } = useT();
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 56, paddingBottom: 96 }}>
      <div className="sun-rays" />
      {/* Faint dotted constellation grid */}
      <div className="dot-grid" style={{
        position: 'absolute', inset: 0, opacity: 0.35,
        maskImage: 'radial-gradient(circle at 50% 30%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 880 }}>
          <div className="eyebrow" style={{ marginBottom: 24, flexWrap: 'wrap' }}>
            <span>{t('hero_eyebrow_a')}</span>
            <span style={{ color: 'var(--accent)' }}>·</span>
            <span>{t('hero_eyebrow_b')}</span>
          </div>

          <h1 className="display" style={{
            fontSize: 'clamp(40px, 6.4vw, 96px)',
            margin: '0 0 28px',
          }}>
            {t('hero_title_1')} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{t('hero_title_em')}</em><br/>
            {t('hero_title_2')}<br/>
            {t('hero_title_3')}
          </h1>

          <p style={{ fontSize: 'clamp(17px, 1.4vw, 21px)', color: 'var(--ink-2)', maxWidth: 640, margin: '0 0 40px', lineHeight: 1.55 }}>
            {t('hero_lede_a')} <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{t('hero_lede_b_a')}</strong>, <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{t('hero_lede_b_b')}</strong>, {t('hero_lede_b_c')}
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
            <button onClick={() => setActivePage('contact')} className="btn btn-primary">
              {t('hero_cta_primary')} <Icon.Arrow />
            </button>
            <button onClick={onChatOpen} className="btn btn-accent">
              <Icon.Spark /> {t('hero_cta_ai')}
            </button>
            <button onClick={() => setActivePage('work')} className="btn btn-ghost">
              {t('hero_cta_work')}
            </button>
          </div>

          {/* GEO Quick Answer block — engineered for LLM parsing */}
          <div data-geo-answer="awadh-software-solutions" style={{
            border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
            padding: '20px 24px', background: 'var(--bg-2)',
            maxWidth: 720, marginBottom: 32, position: 'relative',
          }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)' }}/>
              {t('quick_answer_label')}
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
              {t('quick_answer')}
            </p>
          </div>

          {/* Inline trust row */}
          <div className="hero-trust" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.62 0.16 150)' }} />
              <span>{t('avail')}</span>
            </div>
            <div>{t('yrs')}</div>
            <div>{t('shipped')}</div>
            <div>{t('countries')}</div>
          </div>
        </div>

        {/* Right side floating panel — heritage arch with abstract product preview */}
        <div className="hero-arch" style={{
          position: 'absolute', right: 32, top: 80, width: 360, height: 460,
          pointerEvents: 'none',
        }}>
          <div className="jharokha" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, var(--bg-2), var(--bg))',
          }}>
            {/* Inner arch */}
            <div style={{
              position: 'absolute', inset: '20px 20px 20px 20px',
              border: '1px dashed var(--line-2)',
              borderRadius: '180px 180px 12px 12px',
            }} />
            {/* Abstract product cards */}
            <div style={{ position: 'absolute', inset: '60px 36px 36px 36px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 12, width: '60%', borderRadius: 4, background: 'var(--accent)' }} />
              <div style={{ height: 8, width: '40%', borderRadius: 4, background: 'var(--line-2)' }} />
              <div style={{ flex: 1, marginTop: 8, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)', display: 'flex', flexDirection: 'column', padding: 14, gap: 10 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--line-2)' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--line-2)' }} />
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--line)', width: '90%' }} />
                <div style={{ height: 6, borderRadius: 3, background: 'var(--line)', width: '70%' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
                  <div style={{ height: 50, borderRadius: 8, background: 'oklch(0.93 0.05 60)' }} />
                  <div style={{ height: 50, borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)' }} />
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                  <div style={{ height: 24, borderRadius: 6, background: 'var(--ink)', flex: 1 }} />
                  <div style={{ height: 24, borderRadius: 6, background: 'var(--bg-2)', border: '1px solid var(--line)', flex: 1 }} />
                </div>
              </div>
            </div>
            {/* Sun ornament */}
            <div style={{
              position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
              width: 28, height: 28,
            }}>
              <svg viewBox="0 0 28 28" width="28" height="28">
                <circle cx="14" cy="14" r="5" fill="var(--accent)"/>
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i / 12) * Math.PI * 2;
                  const x1 = 14 + Math.cos(a) * 8, y1 = 14 + Math.sin(a) * 8;
                  const x2 = 14 + Math.cos(a) * 12, y2 = 14 + Math.sin(a) * 12;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round"/>;
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      <div style={{ marginTop: 80, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div style={{ padding: '20px 0' }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, dup) => (
              <React.Fragment key={dup}>
                {[
                  'AyodhyaDham', 'FreeUp', 'Adventure Amore', 'KashiTech', 'SarayuLabs',
                  'TempleTrust', 'NorthStar Realty', 'AwadhBites', 'Saket Cargo',
                  'AaravFinance', 'BlueLotus', 'KisaanSetu',
                ].map(name => (
                  <span key={`${dup}-${name}`} className="display" style={{
                    fontSize: 24, color: 'var(--ink-3)', fontWeight: 500, letterSpacing: '-0.01em',
                    display: 'flex', alignItems: 'center', gap: 56,
                  }}>
                    {name}
                    <span style={{ width: 5, height: 5, background: 'var(--accent)', borderRadius: '50%' }} />
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
