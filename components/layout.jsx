// Topbar + Navigation + Footer + FAB — template redesign
const NAV_L = {
  en: { home: 'Home', services: 'Services', work: 'Portfolio', about: 'About Us', contact: 'Contact Us', quote: 'Get a Free Quote' },
  hi: { home: 'होम', services: 'सेवाएँ', work: 'पोर्टफोलियो', about: 'हमारे बारे में', contact: 'संपर्क करें', quote: 'मुफ़्त कोटेशन पाएँ' },
};
const LogoMark = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 3 L37 37 H29.5 L20 16.5 L10.5 37 H3 Z" fill="var(--navy-2)"/>
    <path d="M11 36.5 Q19 26 31 31.5 L28.5 37 H10.8 Z" fill="var(--accent)"/>
  </svg>
);
const Logo = ({ onClick }) => (
  <button onClick={onClick} style={{ display: 'flex', alignItems: 'center' }} aria-label="Awadh Software home">
    <img src="assets/awadh-logo.png" alt="Awadh Software" style={{ height: 42, display: 'block' }}/>
  </button>
);
const TopBar = () => (
  <div className="topbar desktop-only">
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 32px', gap: 16 }}>
      <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
        <span style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}><span style={{ color: 'var(--accent)', display: 'flex' }}><Icon.Pin/></span>Ayodhya, Uttar Pradesh, India</span>
        <a href="mailto:info@awadhsoftwaresolutions.com" style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}><span style={{ color: 'var(--accent)', display: 'flex' }}><Icon.Mail/></span>info@awadhsoftwaresolutions.com</a>
      </div>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
        <a href="tel:+917011650803" style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}><span style={{ color: 'var(--accent)', display: 'flex' }}><Icon.Phone/></span>+91 70116 50803</a>
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,.2)' }}></span>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="https://www.linkedin.com/in/cyberbaba/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ display: 'flex' }}><Icon.Linkedin/></a>
          <a href="https://github.com/vishnumishra" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ display: 'flex' }}><Icon.Github/></a>
          <a href="https://wa.me/917011650803" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ display: 'flex' }}><Icon.WhatsApp/></a>
        </div>
      </div>
    </div>
  </div>
);
const Nav = ({ activePage, setActivePage }) => {
  const { lang, setLang } = useT();
  const L = NAV_L[lang] || NAV_L.en;
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [
    { id: 'home', label: L.home },
    { id: 'about', label: L.about },
    { id: 'services', label: L.services },
    { id: 'work', label: L.work },
    { id: 'contact', label: L.contact },
  ];
  const go = (id) => { setActivePage(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <React.Fragment>
      <TopBar/>
      <header className={scrolled ? 'nav-blur' : ''} style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid var(--line)', transition: 'box-shadow .2s' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', gap: 24 }}>
          <Logo onClick={() => go('home')}/>
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {items.map(it => (
              <button key={it.id} onClick={() => go(it.id)} style={{
                padding: '10px 14px', fontSize: 14.5, fontWeight: 500, position: 'relative',
                color: activePage === it.id ? 'var(--accent)' : 'var(--ink)',
                transition: 'color .15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = activePage === it.id ? 'var(--accent)' : 'var(--ink)'}>
                {it.label}
                {activePage === it.id && <span style={{ position: 'absolute', left: 14, right: 14, bottom: 2, height: 2, background: 'var(--accent)', borderRadius: 1 }}></span>}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 999, padding: 2 }}>
              {[['en','EN'],['hi','हिं']].map(([v, lab]) => (
                <button key={v} onClick={() => setLang(v)} style={{
                  padding: '5px 11px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                  background: lang === v ? 'var(--navy-2)' : 'transparent',
                  color: lang === v ? '#fff' : 'var(--ink-3)',
                }}>{lab}</button>
              ))}
            </div>
            <button onClick={() => go('contact')} className="btn btn-primary desktop-only" style={{ padding: '11px 20px', fontSize: 14 }}>
              {L.quote} <Icon.Arrow />
            </button>
            <button onClick={() => setMobileOpen(o => !o)} className="mobile-only" style={{ padding: '8px 10px', border: '1.5px solid var(--line-2)', borderRadius: 8 }} aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-only" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
            <div className="container" style={{ padding: '14px 20px 20px', display: 'grid', gap: 4 }}>
              {items.map(it => (
                <button key={it.id} onClick={() => go(it.id)} style={{
                  padding: '13px 14px', textAlign: 'left', borderRadius: 8, fontSize: 16, fontWeight: 500,
                  color: activePage === it.id ? 'var(--accent)' : 'var(--ink)',
                  background: activePage === it.id ? 'var(--accent-soft)' : 'transparent',
                }}>{it.label}</button>
              ))}
              <button onClick={() => go('contact')} className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>{L.quote} <Icon.Arrow /></button>
            </div>
          </div>
        )}
      </header>
    </React.Fragment>
  );
};

const FOOT_L = {
  en: { based: 'Proudly Based in', city: 'Ayodhya', blurb: 'Inspired by our heritage, committed to building a digital future.', quick: 'Quick Links', contact: 'Contact Us', rights: 'All Rights Reserved.', privacy: 'Privacy Policy', terms: 'Terms & Conditions' },
  hi: { based: 'गर्व से स्थित —', city: 'अयोध्या', blurb: 'हमारी विरासत से प्रेरित, डिजिटल भविष्य के निर्माण के लिए प्रतिबद्ध।', quick: 'त्वरित लिंक', contact: 'संपर्क करें', rights: 'सर्वाधिकार सुरक्षित।', privacy: 'गोपनीयता नीति', terms: 'नियम व शर्तें' },
};
const Footer = ({ setActivePage }) => {
  const { lang } = useT();
  const L = FOOT_L[lang] || FOOT_L.en;
  const N = NAV_L[lang] || NAV_L.en;
  const links = [
    { id: 'home', label: N.home }, { id: 'about', label: N.about },
    { id: 'services', label: N.services }, { id: 'work', label: N.work },
    { id: 'contact', label: N.contact },
  ];
  const go = (id) => { setActivePage(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <footer style={{ background: 'var(--navy)', color: '#c6d2e4' }}>
      <div className="container" style={{ padding: '56px 32px 0' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr 1.1fr', gap: 48, alignItems: 'flex-start' }}>
          <div>
            <img src="assets/awadh-logo-light.png" alt="Awadh Software" style={{ height: 44, display: 'block', marginBottom: 18 }}/>
            <p style={{ fontSize: 14, margin: 0, maxWidth: 300 }}>{L.blurb}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[['https://www.linkedin.com/in/cyberbaba/', 'LinkedIn', Icon.Linkedin], ['https://github.com/vishnumishra', 'GitHub', Icon.Github], ['https://wa.me/917011650803', 'WhatsApp', Icon.WhatsApp]].map(([href, label, Ic]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Ic/></a>
              ))}
            </div>
            <a href="https://www.meetup.com/awadh-tech-community/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18, fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
              Awadh Tech Community · 300+ members
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </a>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: '0 0 16px' }}>{L.quick}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
              {links.map(l => <li key={l.id}><button onClick={() => go(l.id)} style={{ padding: 0 }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>{l.label}</button></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: '0 0 16px' }}>{L.contact}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12, fontSize: 14 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}><Icon.Pin/></span><span>HIG A-11, Saketpuri, Ayodhya, Uttar Pradesh</span></li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon.Mail/></span><a href="mailto:info@awadhsoftwaresolutions.com" style={{ wordBreak: 'break-all', color: '#c6d2e4' }}>info@awadhsoftwaresolutions.com</a></li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}><Icon.Phone/></span><a href="tel:+917011650803" style={{ color: '#c6d2e4' }}>+91 70116 50803</a></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 44, padding: '20px 0', borderTop: '1px solid rgba(255,255,255,.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: 12.5, color: '#8fa0ba' }}>
          <div>© 2026 Awadh Software Solutions. {L.rights}</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: '#8fa0ba' }}>{L.privacy}</a>
            <a href="#" style={{ color: '#8fa0ba' }}>{L.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StickyFab = ({ onChatOpen }) => {
  const { t } = useT();
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="https://wa.me/917011650803?text=Hi%20Awadh%20Software%20Solutions%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"
             style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#1faa53', color: '#fff', borderRadius: 999, boxShadow: 'var(--shadow-2)', fontWeight: 500, fontSize: 14 }}>
            <Icon.WhatsApp /> {t('fab_wa')}
          </a>
          <a href="tel:+917011650803" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--navy-2)', color: '#fff', borderRadius: 999, boxShadow: 'var(--shadow-2)', fontWeight: 500, fontSize: 14 }}>
            <Icon.Phone /> +91 70116 50803
          </a>
          <button onClick={() => { onChatOpen(); setOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 999, boxShadow: 'var(--shadow-2)', fontWeight: 500, fontSize: 14 }}>
            <Icon.Spark /> {t('fab_ai')}
          </button>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} aria-label="Contact options" style={{
        width: 58, height: 58, borderRadius: '50%',
        background: open ? 'var(--navy-2)' : 'var(--accent)', color: '#fff',
        boxShadow: 'var(--shadow-3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform .25s, background .2s', transform: open ? 'rotate(45deg)' : 'rotate(0)',
      }}>
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4c-1.5 0-2.9-.3-4.1-1L3 20l1.2-4.2a8.3 8.3 0 0 1-1.2-4.3A8.4 8.4 0 0 1 11.5 3a8.4 8.4 0 0 1 9.5 8.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="8.5" cy="11.5" r="1" fill="currentColor"/><circle cx="12.5" cy="11.5" r="1" fill="currentColor"/><circle cx="16.5" cy="11.5" r="1" fill="currentColor"/></svg>
        }
      </button>
    </div>
  );
};

const ArchDivider = () => null;
Object.assign(window, { Nav, Footer, StickyFab, ArchDivider, LogoMark });
