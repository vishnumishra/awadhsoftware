// Main App + Tweaks panel + page routing
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{}/*EDITMODE-END*/;

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('awadh_lang') || 'en'; } catch (e) { return 'en'; }
  });
  useEffect(() => {
    try { localStorage.setItem('awadh_lang', lang); } catch (e) {}
  }, [lang]);

  useEffect(() => {
    const titles = {
      home: 'Awadh Software Solutions — Web, Mobile, AI & Digital Marketing in Ayodhya',
      services: 'Services · Awadh Software Solutions',
      work: 'Portfolio · 50+ Projects Shipped · Awadh Software Solutions',
      about: 'About · Awadh Software Solutions',
      contact: 'Contact · Awadh Software Solutions',
    };
    document.title = titles[activePage] || titles.home;
  }, [activePage]);

  return (
    <I18nProvider lang={lang} setLang={setLang}>
      <Nav activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'home' && (
        <main>
          <Hero setActivePage={setActivePage} onChatOpen={() => setChatOpen(true)} />
          <ServicesGrid setActivePage={setActivePage} />
          <AyodhyaBand />
          <AboutBlock setActivePage={setActivePage} />
          <TechRow />
          <WhyChoose />
          <CaseStudies setActivePage={setActivePage} />
          <Testimonials />
          <ClientsStrip />
          <Community />
          <FinalCTA setActivePage={setActivePage} onChatOpen={() => setChatOpen(true)} />
        </main>
      )}
      {activePage === 'services' && <ServicesPage setActivePage={setActivePage} />}
      {activePage === 'work' && <PortfolioPage setActivePage={setActivePage} />}
      {activePage === 'about' && <AboutPage setActivePage={setActivePage} />}
      {activePage === 'contact' && <ContactPageNew />}
      <Footer setActivePage={setActivePage} />
      <StickyFab onChatOpen={() => setChatOpen(true)} />
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      <TweaksPanel title="Tweaks">
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

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
