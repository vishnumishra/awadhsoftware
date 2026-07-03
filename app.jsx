// Main App + Tweaks panel + page routing (real URLs for SEO)

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "navy",
  "mode": "dark"
}/*EDITMODE-END*/;

// SEO: each page has a real URL, title, description and canonical.
const ROUTES = {
  home:     { path: '/',          title: 'Software Development & Digital Marketing Company in Ayodhya | Awadh Software Solutions',
              desc: 'Awadh Software Solutions builds web apps, mobile apps, AI agents & chatbots and runs SEO & ad campaigns from Ayodhya, India. 11+ years, 50+ projects shipped. Get a free consultation.' },
  services: { path: '/services/', title: 'Web, Mobile App & AI Development, SEO Services in Ayodhya | Awadh Software Solutions',
              desc: 'Web application development, iOS & Android apps, AI agents, AI chatbots, digital marketing and SEO / LLM SEO services in Ayodhya & Lucknow. Get a fixed quote in 48 hours.' },
  work:     { path: '/work/',     title: 'Our Work — 50+ Web, Mobile & AI Projects Shipped | Awadh Software Solutions',
              desc: 'Case studies from Awadh Software Solutions: pilgrimage portals, US marketplaces, AI products and lead-gen funnels. Real projects, measured outcomes.' },
  about:    { path: '/about/',    title: 'About Awadh Software Solutions — Software Company in Ayodhya Since 2014',
              desc: 'Founded in 2014 by Vishnu Mishra, Awadh Software Solutions is a software development and digital marketing studio in Ayodhya serving clients in 8+ countries.' },
  contact:  { path: '/contact/',  title: 'Contact Awadh Software Solutions — Ayodhya | Free Quote in 48 Hours',
              desc: 'Talk to Awadh Software Solutions in Ayodhya about your website, mobile app, AI product or marketing campaign. Call/WhatsApp +91 70116 50803 — we reply within 24 hours.' },
};

const pageFromLocation = () => {
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  if (hash && ROUTES[hash]) return hash;
  const seg = window.location.pathname.replace(/\/+$/, '').split('/').pop() || '';
  return ROUTES[seg] ? seg : 'home';
};

const applyPageMeta = (page) => {
  const r = ROUTES[page] || ROUTES.home;
  const url = 'https://awadhsoftware.com' + r.path;
  document.title = r.title;
  const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('meta[name="description"]', 'content', r.desc);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:title"]', 'content', r.title);
  set('meta[property="og:description"]', 'content', r.desc);
  set('meta[property="og:url"]', 'content', url);
};

const App = () => {
  const [activePage, setActivePage] = useState(pageFromLocation);
  const [chatOpen, setChatOpen] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('awadh_lang') || 'en'; } catch (e) { return 'en'; }
  });
  useEffect(() => {
    try { localStorage.setItem('awadh_lang', lang); } catch (e) {}
  }, [lang]);

  // Navigate with a real URL so every page is linkable and indexable
  const navigate = (page) => {
    setActivePage(page);
    const r = ROUTES[page] || ROUTES.home;
    try {
      if (window.location.protocol === 'file:') {
        window.location.hash = page === 'home' ? '' : '#/' + page;
      } else if (window.location.pathname !== r.path) {
        window.history.pushState({ page }, '', r.path);
      }
    } catch (e) { /* sandboxed environments — state routing still works */ }
  };

  // Back/forward buttons
  useEffect(() => {
    const onPop = () => setActivePage(pageFromLocation());
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('hashchange', onPop); };
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (tweaks.mode === 'dark' && tweaks.theme === 'saffron') {
      root.setAttribute('data-theme', 'black');
    } else if (tweaks.theme === 'navy') {
      root.setAttribute('data-theme', 'navy');
    } else if (tweaks.theme === 'black') {
      root.setAttribute('data-theme', 'black');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [tweaks.theme, tweaks.mode]);

  // SEO: update title / description / canonical / og per page
  useEffect(() => { applyPageMeta(activePage); }, [activePage]);

  return (
    <I18nProvider lang={lang} setLang={setLang}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav activePage={activePage} setActivePage={navigate} />

      {activePage === 'home' && (
        <main id="main">
          <Hero setActivePage={navigate} onChatOpen={() => setChatOpen(true)} />
          <ServicesGrid setActivePage={navigate} />
          <VerticalsMatrix setActivePage={navigate} />
          <Stats />
          <ArchDivider />
          <Portfolio setActivePage={navigate} />
          <CaseStudies setActivePage={navigate} />
          <Testimonials />
          <Process />
          <Resources />
          <FAQSection setActivePage={navigate} />
          <FinalCTA setActivePage={navigate} onChatOpen={() => setChatOpen(true)} />
        </main>
      )}
      {activePage === 'services' && <ServicesPage setActivePage={navigate} />}
      {activePage === 'work' && <PortfolioPage setActivePage={navigate} />}
      {activePage === 'about' && <AboutPage setActivePage={navigate} />}
      {activePage === 'contact' && <ContactPageNew />}

      <Footer setActivePage={navigate} />
      <StickyFab onChatOpen={() => setChatOpen(true)} />
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Color theme">
          <TweakRadio
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'saffron', label: 'Saffron' },
              { value: 'navy', label: 'Navy' },
              { value: 'black', label: 'Ink' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Mode">
          <TweakRadio
            value={tweaks.mode}
            onChange={(v) => setTweak('mode', v)}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Language">
          <TweakRadio
            value={lang}
            onChange={setLang}
            options={[
              { value: 'en', label: 'English' },
              { value: 'hi', label: 'हिन्दी' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </I18nProvider>
  );
};

Object.assign(window, { ROUTES });
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
