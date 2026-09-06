// Home blocks — About, Technologies, Why Choose, Clients (template redesign)
const SecHead = ({ eyebrow, title, style }) => (
  <div style={{ textAlign: 'center', marginBottom: 48, ...style }}>
    <div className="sec-eyebrow">{eyebrow}</div>
    <h2 className="display sec-title">{title}</h2>
    <div className="sec-underline"><span></span><span></span></div>
  </div>
);

const HB_L = {
  en: {
    about_eyebrow: 'About Us', about_title: 'Empowering Businesses with Technology & Innovation',
    about_p1: 'Awadh Software Solutions is a software development and digital marketing studio based in Ayodhya, Uttar Pradesh. Founded in 2014 by Vishnu Mishra, we have spent 11+ years building web apps, mobile apps, AI products and growth engines for clients across India and the world.',
    about_p2: 'Our team combines deep technical expertise with creative thinking to ship software that is innovative, user-centric and built to scale.',
    about_points: ['Client-focused approach', 'Timely delivery & quality assurance', 'Affordable & transparent pricing'],
    about_cta: 'Know More About Us', about_badge_n: '11+', about_badge_l: 'Years of Experience',
    tech_eyebrow: 'Technologies We Work With', tech_title: 'Modern Technologies for Modern Solutions',
    why_eyebrow: 'Why Choose Awadh Software?', why_title_1: 'Your Success is', why_title_2: 'Our Commitment',
    why_items: [
      { t: 'Customized Solutions', d: 'Tailored solutions that fit your unique business requirements.' },
      { t: 'On-Time Delivery', d: 'We value your time and ensure timely delivery of every project.' },
      { t: 'Quality Assurance', d: 'We follow best practices to deliver bug-free and reliable solutions.' },
      { t: 'Dedicated Support', d: 'Our support team is always ready to assist you whenever you need.' },
    ],
    cl_eyebrow: 'Our Valued Clients', cl_title: 'Trusted by Businesses Worldwide',
  },
  hi: {
    about_eyebrow: 'हमारे बारे में', about_title: 'तकनीक और नवाचार से व्यवसायों को सशक्त बनाना',
    about_p1: 'अवध सॉफ्टवेयर सॉल्यूशंस अयोध्या, उत्तर प्रदेश स्थित एक सॉफ्टवेयर डेवलपमेंट और डिजिटल मार्केटिंग स्टूडियो है। 2014 में विष्णु मिश्रा द्वारा स्थापित, हम 11+ वर्षों से भारत और दुनिया भर के क्लाइंट्स के लिए वेब ऐप, मोबाइल ऐप, AI उत्पाद और ग्रोथ इंजन बना रहे हैं।',
    about_p2: 'हमारी टीम गहरी तकनीकी विशेषज्ञता और रचनात्मक सोच के साथ ऐसा सॉफ्टवेयर बनाती है जो नवीन, उपयोगकर्ता-केंद्रित और स्केलेबल हो।',
    about_points: ['क्लाइंट-केंद्रित दृष्टिकोण', 'समय पर डिलीवरी और गुणवत्ता आश्वासन', 'किफ़ायती और पारदर्शी मूल्य'],
    about_cta: 'हमारे बारे में और जानें', about_badge_n: '11+', about_badge_l: 'वर्षों का अनुभव',
    tech_eyebrow: 'हमारी तकनीकें', tech_title: 'आधुनिक समाधानों के लिए आधुनिक तकनीक',
    why_eyebrow: 'अवध सॉफ्टवेयर ही क्यों?', why_title_1: 'आपकी सफलता', why_title_2: 'हमारी प्रतिबद्धता है',
    why_items: [
      { t: 'कस्टमाइज़्ड समाधान', d: 'आपके व्यवसाय की विशिष्ट आवश्यकताओं के अनुरूप समाधान।' },
      { t: 'समय पर डिलीवरी', d: 'हम आपके समय का सम्मान करते हैं और हर प्रोजेक्ट समय पर पहुँचाते हैं।' },
      { t: 'गुणवत्ता आश्वासन', d: 'बग-फ्री और विश्वसनीय समाधान के लिए सर्वोत्तम प्रथाएँ।' },
      { t: 'समर्पित सहयोग', d: 'हमारी सपोर्ट टीम हर समय आपकी सहायता के लिए तैयार है।' },
    ],
    cl_eyebrow: 'हमारे प्रतिष्ठित क्लाइंट', cl_title: 'दुनिया भर के व्यवसायों का विश्वास',
  },
};

const CheckDot = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--accent)" strokeWidth="1.5"/><path d="M6.5 10.2l2.3 2.3 4.7-4.8" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const AboutBlock = ({ setActivePage }) => {
  const { lang } = useT();
  const L = HB_L[lang] || HB_L.en;
  return (
    <section id="about-home" style={{ padding: '96px 0 88px' }}>
      <div className="container">
        <div className="about-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center' }}>
          <div className="about-collage" style={{ position: 'relative', minHeight: 380 }}>
            <div className="dot-grid" style={{ position: 'absolute', right: 24, top: 28, width: 120, height: 120, opacity: .7 }}></div>
            <img src="assets/about-ayodhya.png" alt="Ayodhya riverfront temples at dusk" style={{ width: '78%', borderRadius: 16, display: 'block', boxShadow: 'var(--shadow-2)' }}/>
            <img src="assets/team.png" alt="The Awadh Software team at work in the Ayodhya office" style={{ position: 'absolute', right: 0, bottom: 0, width: '58%', borderRadius: 14, boxShadow: 'var(--shadow-2)', border: '5px solid #fff', display: 'block' }}/>
            <div style={{ position: 'absolute', left: 18, bottom: 26, background: 'var(--accent)', color: '#fff', borderRadius: 12, padding: '16px 20px', textAlign: 'center', boxShadow: 'var(--shadow-2)' }}>
              <div className="display" style={{ fontSize: 30, lineHeight: 1 }}>{L.about_badge_n}</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, marginTop: 4 }}>{L.about_badge_l}</div>
            </div>
          </div>
          <div>
            <div className="sec-eyebrow">{L.about_eyebrow}</div>
            <h2 className="display" style={{ fontSize: 'clamp(24px,2.8vw,32px)', margin: '10px 0 0', maxWidth: 480 }}>{L.about_title}</h2>
            <div className="sec-underline left" style={{ margin: '14px 0 20px' }}><span></span><span></span></div>
            <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: '0 0 14px' }}>{L.about_p1}</p>
            <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: '0 0 22px' }}>{L.about_p2}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'grid', gap: 12 }}>
              {L.about_points.map(p => (
                <li key={p} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14.5, fontWeight: 500 }}><CheckDot/>{p}</li>
              ))}
            </ul>
            <button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-primary">{L.about_cta} <Icon.Arrow/></button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TECH = ['React', 'Next.js', 'Node.js', 'React Native', 'Flutter', 'Python', 'PostgreSQL', 'AWS'];
const TechRow = () => {
  const { lang } = useT();
  const L = HB_L[lang] || HB_L.en;
  return (
    <section style={{ padding: '24px 0 88px' }}>
      <div className="container">
        <SecHead eyebrow={L.tech_eyebrow} title={L.tech_title} style={{ marginBottom: 36 }}/>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          {TECH.map(t => (
            <div key={t} className="card" style={{ padding: '14px 28px', fontWeight: 600, fontSize: 15, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-1)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }}></span>{t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyIcon = ({ i }) => {
  const g = [
    <g key="a"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1"/></g>,
    <g key="b"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></g>,
    <g key="c"><path d="M12 3l7 2.5v5.5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V5.5L12 3z"/><path d="M9 12l2.2 2.2L15.5 9.8"/></g>,
    <g key="d"><path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="6" rx="1.6"/><rect x="17" y="13" width="4" height="6" rx="1.6"/><path d="M19 19v1a2 2 0 0 1-2 2h-3"/></g>,
  ];
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{g[i]}</svg>;
};
const WhyChoose = () => {
  const { lang } = useT();
  const L = HB_L[lang] || HB_L.en;
  return (
    <section style={{ background: 'var(--navy)', color: '#fff', padding: '72px 0' }}>
      <div className="container">
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 2fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="sec-eyebrow">{L.why_eyebrow}</div>
            <h2 className="display" style={{ fontSize: 'clamp(24px,2.6vw,32px)', color: '#fff', margin: '10px 0 0' }}>{L.why_title_1}<br/>{L.why_title_2}</h2>
            <div className="sec-underline left" style={{ marginTop: 16 }}><span></span><span></span></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {L.why_items.map((w, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: i ? 0 : 0 }}>
                <span style={{ width: 52, height: 52, borderRadius: '50%', border: '1.5px solid rgba(244,121,31,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(244,121,31,.08)' }}><WhyIcon i={i}/></span>
                <div style={{ fontWeight: 600, fontSize: 15.5 }}>{w.t}</div>
                <div style={{ fontSize: 13, color: '#9fb0c9' }}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CLIENTS = [
  { n: 'AyodhyaDham.info', c: '#C2610F', u: 'https://ayodhyadham.info' },
  { n: 'FreeUp.net', c: '#3D3DDB', u: 'https://freeup.net' },
  { n: 'Adventure Amore', c: '#0B4F3C', u: 'https://adventureamore.com' },
  { n: 'KashiTech', c: '#6B4E9E' },
  { n: 'SarayuLabs', c: '#1C5FA8' },
  { n: 'TempleTrust', c: '#A6631B' },
];
const ClientsStrip = () => {
  const { lang } = useT();
  const L = HB_L[lang] || HB_L.en;
  return (
    <section style={{ padding: '88px 0 8px' }}>
      <div className="container">
        <SecHead eyebrow={L.cl_eyebrow} title={L.cl_title} style={{ marginBottom: 36 }}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
          {CLIENTS.map(cl => (
            React.createElement(cl.u ? 'a' : 'div', { key: cl.n, className: 'card', href: cl.u, target: cl.u ? '_blank' : undefined, rel: 'noreferrer', style: { padding: '20px 12px', textAlign: 'center', fontWeight: 600, fontSize: 14.5, color: cl.c, boxShadow: 'var(--shadow-1)', borderTop: '3px solid ' + cl.c, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 74 } }, cl.n)
          ))}
        </div>
      </div>
    </section>
  );
};

const BAND_L = {
  en: { based: 'Proudly Based in', city: 'Ayodhya', blurb: 'Inspired by our heritage, committed to building a digital future.',
    items: [
      { t: 'Local Roots', d: 'Strong values, local understanding.' },
      { t: 'Global Vision', d: 'Delivering solutions to clients worldwide.' },
      { t: 'Innovation Driven', d: 'Using technology to create impact.' },
    ] },
  hi: { based: 'गर्व से स्थित —', city: 'अयोध्या', blurb: 'हमारी विरासत से प्रेरित, डिजिटल भविष्य के निर्माण के लिए प्रतिबद्ध।',
    items: [
      { t: 'स्थानीय जड़ें', d: 'मज़बूत मूल्य, स्थानीय समझ।' },
      { t: 'वैश्विक दृष्टि', d: 'दुनिया भर के क्लाइंट्स को समाधान।' },
      { t: 'नवाचार-प्रेरित', d: 'प्रभाव बनाने के लिए तकनीक का उपयोग।' },
    ] },
};
const BandIcon = ({ i }) => {
  const g = [
    <g key="a"><path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 1 1 13 0c0 4.6-6.5 10-6.5 10z"/><circle cx="12" cy="10.6" r="2.4"/></g>,
    <g key="b"><circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.2 2.4 3.3 5.4 3.3 8.6s-1.1 6.2-3.3 8.6c-2.2-2.4-3.3-5.4-3.3-8.6S9.8 5.8 12 3.4z"/></g>,
    <g key="c"><path d="M12 3v5M12 16v5M4.6 7.4l3.6 2.1M15.8 14.5l3.6 2.1M19.4 7.4l-3.6 2.1M8.2 14.5l-3.6 2.1"/><circle cx="12" cy="12" r="2.6"/></g>,
  ];
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{g[i]}</svg>;
};
const AyodhyaBand = () => {
  const { lang } = useT();
  const L = BAND_L[lang] || BAND_L.en;
  return (
    <section className="ayodhya-band">
      <img src="assets/footer-lineart.png" alt="" aria-hidden="true" className="band-art"/>
      <div className="container band-inner">
        <div className="band-copy">
          <h2 className="display" style={{ fontSize: 'clamp(22px,2.4vw,28px)', color: '#fff', margin: 0 }}>{L.based} <span style={{ color: 'var(--accent)' }}>{L.city}</span></h2>
          <div className="sec-underline left" style={{ margin: '12px 0 14px' }}><span></span><span></span></div>
          <p style={{ fontSize: 14.5, color: '#c3d0e2', margin: 0, maxWidth: 330 }}>{L.blurb}</p>
        </div>
        <div className="band-items">
          {L.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ width: 46, height: 46, flexShrink: 0, borderRadius: '50%', border: '1.5px solid rgba(244,121,31,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BandIcon i={i}/></span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15.5, color: '#fff' }}>{it.t}</div>
                <div style={{ fontSize: 13, color: '#9fb0c9', marginTop: 3 }}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const COMM_L = {
  en: { eyebrow: 'Community', title: 'We run the Awadh Tech Community', n: '300+', nl: 'members',
    blurb: 'A meetup group for developers, founders and students in Ayodhya and across Awadh — talks, workshops and hiring, hosted by our team.', cta: 'Join on Meetup' },
  hi: { eyebrow: 'समुदाय', title: 'हम अवध टेक कम्युनिटी चलाते हैं', n: '300+', nl: 'सदस्य',
    blurb: 'अयोध्या और पूरे अवध के डेवलपर्स, फाउंडर्स और छात्रों के लिए एक मीटअप समूह — टॉक, वर्कशॉप और हायरिंग, हमारी टीम द्वारा आयोजित।', cta: 'मीटअप पर जुड़ें' },
};
const Community = () => {
  const { lang } = useT();
  const L = COMM_L[lang] || COMM_L.en;
  return (
    <section style={{ padding: '80px 0 0' }}>
      <div className="container">
        <div className="card community-card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', borderRadius: 12, padding: '22px 26px', minWidth: 132 }}>
            <div className="display" style={{ fontSize: 34, color: 'var(--accent)', lineHeight: 1 }}>{L.n}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-2)', fontWeight: 600, marginTop: 4 }}>{L.nl}</div>
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="sec-eyebrow">{L.eyebrow}</div>
            <h3 className="display" style={{ fontSize: 21, margin: '8px 0 8px' }}>{L.title}</h3>
            <p className="muted" style={{ fontSize: 14, margin: 0, maxWidth: 560 }}>{L.blurb}</p>
          </div>
          <a href="https://www.meetup.com/awadh-tech-community/" target="_blank" rel="noreferrer" className="btn btn-primary">{L.cta} <Icon.Arrow/></a>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { SecHead, AboutBlock, TechRow, WhyChoose, ClientsStrip, AyodhyaBand, Community });
