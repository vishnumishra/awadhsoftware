// Navigation, footer, FAB

const Nav = ({ activePage, setActivePage }) => {
  const { t, lang, setLang } = useT();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [
    { id: 'home', label: t('nav_home') },
    { id: 'services', label: t('nav_services') },
    { id: 'work', label: t('nav_work') },
    { id: 'about', label: t('nav_about') },
    { id: 'contact', label: t('nav_contact') },
  ];
  const go = (id) => { setActivePage(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const hrefFor = (id) => (window.ROUTES && window.ROUTES[id] ? window.ROUTES[id].path : '/');
  const linkTo = (id) => (e) => { e.preventDefault(); go(id); };
  return (
    <header className={scrolled ? 'nav-blur' : ''} style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'border-color 0.2s ease, background 0.3s ease',
    }}>
      <div className="container nav-header" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px', gap: 24,
      }}>
        <a href="/" onClick={linkTo('home')} aria-label="Awadh Software Solutions — home" style={{
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ color: 'var(--accent)', display: 'flex' }}>
            <Icon.Logo size={32} />
          </span>
          <div style={{ textAlign: 'left', lineHeight: 1.05 }}>
            <div className="display" style={{ fontSize: 17, fontWeight: 600 }}>Awadh</div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Software Solutions</div>
          </div>
        </a>

        <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-only">
          {items.map(it => (
            <a key={it.id} href={hrefFor(it.id)} onClick={linkTo(it.id)}
              aria-current={activePage === it.id ? 'page' : undefined} style={{
              padding: '8px 14px', borderRadius: 999,
              fontSize: 14, fontWeight: 500,
              color: activePage === it.id ? 'var(--ink)' : 'var(--ink-3)',
              background: activePage === it.id ? 'var(--bg-2)' : 'transparent',
              transition: 'color 0.15s, background 0.15s',
            }}>{it.label}</a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 999, padding: 2 }}>
            <button onClick={() => setLang('en')} style={{
              padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: lang === 'en' ? 'var(--ink)' : 'transparent',
              color: lang === 'en' ? 'var(--bg)' : 'var(--ink-3)',
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em',
            }}>EN</button>
            <button onClick={() => setLang('hi')} style={{
              padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: lang === 'hi' ? 'var(--ink)' : 'transparent',
              color: lang === 'hi' ? 'var(--bg)' : 'var(--ink-3)',
            }}>हिं</button>
          </div>
          <a href="tel:+917011650803" className="btn btn-ghost desktop-only" style={{ padding: '10px 16px', fontSize: 13 }}>
            <Icon.Phone /> {t('nav_phone_label')}
          </a>
          <button onClick={() => go('contact')} className="btn btn-primary nav-cta" style={{ padding: '10px 18px', fontSize: 14 }}>
            {t('nav_cta')} <Icon.Arrow />
          </button>
          <button onClick={() => setMobileOpen(o => !o)} className="mobile-only btn btn-ghost" style={{ padding: '8px 10px' }} aria-label="Menu" aria-expanded={mobileOpen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav aria-label="Mobile" className="mobile-only" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
          <div className="container" style={{ padding: '16px 20px', display: 'grid', gap: 4 }}>
            {items.map(it => (
              <a key={it.id} href={hrefFor(it.id)} onClick={linkTo(it.id)}
                aria-current={activePage === it.id ? 'page' : undefined} style={{
                display: 'block',
                padding: '12px 14px', textAlign: 'left', borderRadius: 10,
                fontSize: 16, fontWeight: 500,
                color: activePage === it.id ? 'var(--ink)' : 'var(--ink-2)',
                background: activePage === it.id ? 'var(--bg-2)' : 'transparent',
              }}>{it.label}</a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

const Footer = ({ setActivePage }) => {
  const { t } = useT();
  const hrefFor = (id) => (window.ROUTES && window.ROUTES[id] ? window.ROUTES[id].path : '/');
  const linkTo = (id) => (e) => { e.preventDefault(); setActivePage(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)', marginTop: 80 }}>
      <div className="container" style={{ padding: '64px 32px 32px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(260px, 1.4fr) repeat(3, 1fr)',
          gap: 48,
        }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ color: 'var(--accent)', display: 'flex' }}><Icon.Logo size={36} /></span>
              <div className="display" style={{ fontSize: 22, fontWeight: 600 }}>Awadh<span style={{ color: 'var(--accent)' }}>.</span></div>
            </div>
            <p className="muted" style={{ fontSize: 14, maxWidth: 320, marginBottom: 20 }}>
              {t('f_lede')}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://www.linkedin.com/in/cyberbaba/" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: 10, borderRadius: 10 }} aria-label="LinkedIn"><Icon.Linkedin /></a>
              <a href="https://github.com/vishnumishra" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: 10, borderRadius: 10 }} aria-label="GitHub"><Icon.Github /></a>
              <a href="https://wa.me/917011650803" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: 10, borderRadius: 10 }} aria-label="WhatsApp"><Icon.WhatsApp /></a>
            </div>
          </div>

          <div>
            <h4 className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 16, fontWeight: 500 }}>{t('f_services')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
              <li><a href={hrefFor('services')} onClick={linkTo('services')}>Web application development</a></li>
              <li><a href={hrefFor('services')} onClick={linkTo('services')}>Mobile app development (iOS / Android)</a></li>
              <li><a href={hrefFor('services')} onClick={linkTo('services')}>AI / agentic product development</a></li>
              <li><a href={hrefFor('services')} onClick={linkTo('services')}>AI chatbot development</a></li>
              <li><a href={hrefFor('services')} onClick={linkTo('services')}>Digital marketing &amp; SEO / LLM SEO</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 16, fontWeight: 500 }}>{t('f_studio')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
              <li><a href={hrefFor('about')} onClick={linkTo('about')}>About us</a></li>
              <li><a href={hrefFor('work')} onClick={linkTo('work')}>Selected work</a></li>
              <li><a href={hrefFor('contact')} onClick={linkTo('contact')}>Contact</a></li>
              <li><a href="https://www.vishnumishra.com/" target="_blank" rel="noreferrer">Founder's portfolio ↗</a></li>
              <li><a href="mailto:info@awadhsoftwaresolutions.com?subject=Careers%20at%20Awadh%20Software%20Solutions">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 16, fontWeight: 500 }}>{t('f_reach')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12, fontSize: 14 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}><Icon.Pin /></span>
                <span className="muted">HIG A-11, Saketpuri,<br/>Ayodhya, Uttar Pradesh</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)' }}><Icon.Phone /></span>
                <a href="tel:+917011650803">+91 70116 50803</a>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)' }}><Icon.Mail /></span>
                <a href="mailto:info@awadhsoftwaresolutions.com" style={{ wordBreak: 'break-all' }}>info@awadhsoftwaresolutions.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{
          marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--ink-3)',
        }}>
          <div className="mono">© 2026 AWADH SOFTWARE SOLUTIONS · awadhsoftware.com</div>
          <div className="mono" style={{ display: 'flex', gap: 20 }}>
            <span>Made with care in Ayodhya 🪔</span>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sticky FAB — WhatsApp + Call
const StickyFab = ({ onChatOpen }) => {
  const { t } = useT();
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="https://wa.me/917011650803?text=Hi%20Awadh%20Software%20Solutions%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"
             style={{
               display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
               background: 'oklch(0.62 0.16 150)', color: 'white', borderRadius: 999,
               boxShadow: 'var(--shadow-2)', fontWeight: 500, fontSize: 14,
             }}>
            <Icon.WhatsApp /> {t('fab_wa')}
          </a>
          <a href="tel:+917011650803"
             style={{
               display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
               background: 'var(--ink)', color: 'var(--bg)', borderRadius: 999,
               boxShadow: 'var(--shadow-2)', fontWeight: 500, fontSize: 14,
             }}>
            <Icon.Phone /> +91 70116 50803
          </a>
          <button onClick={() => { onChatOpen(); setOpen(false); }}
             style={{
               display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
               background: 'var(--accent)', color: 'oklch(0.18 0.01 60)', borderRadius: 999,
               boxShadow: 'var(--shadow-2)', fontWeight: 500, fontSize: 14,
             }}>
            <Icon.Spark /> {t('fab_ai')}
          </button>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} aria-label="Contact options" style={{
        width: 60, height: 60, borderRadius: '50%',
        background: open ? 'var(--ink)' : 'var(--accent)',
        color: open ? 'var(--bg)' : 'oklch(0.18 0.01 60)',
        boxShadow: 'var(--shadow-3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.25s ease, background 0.2s ease',
        transform: open ? 'rotate(45deg)' : 'rotate(0)',
      }}>
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/></svg>
        }
      </button>
    </div>
  );
};

// Heritage arch divider
const ArchDivider = () => (
  <div className="arch-divider" aria-hidden="true">
    <svg viewBox="0 0 1280 40" preserveAspectRatio="none">
      <path d="M0 38 L0 32 Q0 24 8 24 L40 24 Q48 24 50 18 Q52 8 60 8 Q68 8 70 18 Q72 24 80 24 L120 24 Q128 24 130 18 Q132 8 140 8 Q148 8 150 18 Q152 24 160 24 L1120 24 Q1128 24 1130 18 Q1132 8 1140 8 Q1148 8 1150 18 Q1152 24 1160 24 L1200 24 Q1208 24 1210 18 Q1212 8 1220 8 Q1228 8 1230 18 Q1232 24 1240 24 L1272 24 Q1280 24 1280 32 L1280 38" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
      <line x1="0" y1="38" x2="1280" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
    </svg>
  </div>
);

Object.assign(window, { Nav, Footer, StickyFab, ArchDivider });
