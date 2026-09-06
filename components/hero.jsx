// Hero — matches comp: faded temple right, orange pattern wedge, navy stats bar inside hero
const HERO_L = {
  en: {
    l1: 'Building', l2: 'Digital Solutions', l3: 'Inspired by Ayodhya',
    lede: 'We help businesses and organizations with innovative digital solutions, modern technologies and a customer-first approach.',
    cta1: 'Explore Services', cta2: 'View Our Work',
    values: ['Client Focused', 'Innovative Solutions', 'Quality & Reliability', 'Long Term Partnership'],
    stats: [
      { n: '50+', l: 'Happy Clients' },
      { n: '120+', l: 'Projects Delivered' },
      { n: '8+', l: 'Years Experience' },
      { n: '100%', l: 'Client Satisfaction' },
    ],
  },
  hi: {
    l1: 'निर्माण', l2: 'डिजिटल समाधान', l3: 'अयोध्या से प्रेरित',
    lede: 'हम व्यवसायों और संस्थाओं को नवीन डिजिटल समाधान, आधुनिक तकनीक और ग्राहक-प्रथम दृष्टिकोण के साथ सहयोग देते हैं।',
    cta1: 'सेवाएँ देखें', cta2: 'हमारा काम देखें',
    values: ['ग्राहक-केंद्रित', 'नवीन समाधान', 'गुणवत्ता व विश्वसनीयता', 'दीर्घकालिक साझेदारी'],
    stats: [
      { n: '50+', l: 'संतुष्ट क्लाइंट' },
      { n: '120+', l: 'प्रोजेक्ट डिलीवर' },
      { n: '8+', l: 'वर्षों का अनुभव' },
      { n: '100%', l: 'क्लाइंट संतुष्टि' },
    ],
  },
};
const StatIcon = ({ i }) => {
  const paths = [
    <g key="a"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5"/><circle cx="16.5" cy="8.5" r="2.6"/><path d="M15.5 13.6c2.4.2 4.2 1.6 4.8 4.4"/></g>,
    <g key="b"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8 5V3M16 5V3M8 13h3M8 16.5h5"/></g>,
    <g key="c"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></g>,
    <g key="d"><path d="M12 3l7 2.5v5.5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V5.5L12 3z"/><path d="M9 12l2.2 2.2L15.5 9.8"/></g>,
  ];
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[i]}</svg>;
};
const ValueIcon = ({ i }) => {
  const g = [
    <g key="a"><circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="3.6"/><path d="M12 3.6v3M12 17.4v3M3.6 12h3M17.4 12h3"/></g>,
    <g key="b"><path d="M9.2 17.4h5.6M10 20.4h4"/><path d="M12 3.6a5.6 5.6 0 0 1 3.4 10.1c-.5.4-.8 1-.8 1.6H9.4c0-.6-.3-1.2-.8-1.6A5.6 5.6 0 0 1 12 3.6z"/></g>,
    <g key="c"><path d="M12 3.4l6.6 2.4v5.1c0 4.2-2.8 7.8-6.6 9.3-3.8-1.5-6.6-5.1-6.6-9.3V5.8L12 3.4z"/><path d="M9.3 12.1l2 2 3.9-4.1"/></g>,
    <g key="d"><path d="M3.4 12.6l3.2-3.2 3.4 3.1a2 2 0 0 0 2.7 0l1-.9 4.9 4.3"/><path d="M20.6 11.4l-3.2 3.2M7.6 8.2l3.5-2.6c.6-.4 1.4-.5 2-.1l3.6 2.1"/></g>,
  ];
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{g[i]}</svg>;
};
const Hero = ({ setActivePage, onChatOpen }) => {
  const { lang } = useT();
  const L = HERO_L[lang] || HERO_L.en;
  return (
    <section className="hero-sec">
      <img src="assets/hero-fade.png" alt="Ayodhya temples on the Sarayu riverfront at sunset" className="hero-photo"/>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-dashes" aria-hidden="true"><i></i><i></i><i></i></div>
          <h1 className="hero-head display">
            <span className="slab">{L.l1}</span>
            <span className="slab accent">{L.l2}</span>
            <span className="slab">{L.l3}</span>
          </h1>
          <p className="hero-lede">{L.lede}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-primary">{L.cta1} <Icon.Arrow /></button>
            <button onClick={() => { setActivePage('work'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-ghost">
              {L.cta2}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.4"/><path d="M10 8.8l5.2 3.2-5.2 3.2V8.8z" fill="currentColor"/></svg>
            </button>
          </div>
          <ul className="hero-values">
            {L.values.map((v, i) => (
              <li key={v}><span className="hv-badge"><ValueIcon i={i}/></span>{v}</li>
            ))}
          </ul>
        </div>
        <div className="stats-bar">
          {L.stats.map((s, i) => (
            <div key={i}>
              <StatIcon i={i}/>
              <div>
                <div className="display" style={{ fontSize: 21, lineHeight: 1.1 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.72)' }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
window.Hero = Hero;
