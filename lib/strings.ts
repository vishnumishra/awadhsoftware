// UI strings for both languages. `hi` must have the same shape as `en`.
const en = {
  nav: { home: 'Home', about: 'About Us', services: 'Services', work: 'Portfolio', contact: 'Contact Us', quote: 'Get a Free Quote', menu: 'Menu' },
  hero: {
    titlePre: 'Building Digital Solutions for a ',
    titleAccent: 'Better Tomorrow',
    titlePost: '',
    lede: 'Awadh Software is a software development company in Ayodhya delivering innovative, reliable and scalable digital solutions to businesses worldwide.',
    cta1: 'Explore Services',
    cta2: 'View Our Work',
    photoAlt: 'Ayodhya temples on the Sarayu riverfront at sunset',
    stats: [
      { n: '50+', l: 'Happy Clients' },
      { n: '50+', l: 'Projects Delivered' },
      { n: '11+', l: 'Years Experience' },
      { n: '100%', l: 'Client Satisfaction' },
    ],
  },
  services: { eyebrow: 'What We Do', title: 'Services That Drive Your Business Forward', more: 'Read More' },
  band: {
    based: 'Proudly Based in', city: 'Ayodhya',
    blurb: 'Inspired by our heritage, committed to building a digital future.',
    items: [
      { t: 'Local Roots', d: 'Strong values, local understanding.' },
      { t: 'Global Vision', d: 'Delivering solutions to clients worldwide.' },
      { t: 'Innovation Driven', d: 'Using technology to create impact.' },
    ],
  },
  about: {
    eyebrow: 'About Us', title: 'Empowering Businesses with Technology & Innovation',
    p1: 'Awadh Software Solutions is a software development and digital marketing studio based in Ayodhya, Uttar Pradesh. Founded in 2014 by Vishnu Mishra, we have spent 11+ years building web apps, mobile apps, AI products and growth engines for clients across India and the world.',
    p2: 'Our team combines deep technical expertise with creative thinking to ship software that is innovative, user-centric and built to scale.',
    points: ['Client-focused approach', 'Timely delivery & quality assurance', 'Affordable & transparent pricing'],
    cta: 'Know More About Us', badgeN: '11+', badgeL: 'Years of Experience',
    imgAlt: 'Ayodhya riverfront temples at dusk', teamAlt: 'The Awadh Software team at work in the Ayodhya office',
  },
  tech: { eyebrow: 'Technologies We Work With', title: 'Modern Technologies for Modern Solutions' },
  why: {
    eyebrow: 'Why Choose Awadh Software?', title1: 'Your Success is', title2: 'Our Commitment',
    items: [
      { t: 'Customized Solutions', d: 'Tailored solutions that fit your unique business requirements.' },
      { t: 'On-Time Delivery', d: 'We value your time and ensure timely delivery of every project.' },
      { t: 'Quality Assurance', d: 'We follow best practices to deliver bug-free and reliable solutions.' },
      { t: 'Dedicated Support', d: 'Our support team is always ready to assist you whenever you need.' },
    ],
  },
  cases: {
    eyebrow: 'Case studies · Measured outcomes', titleA: 'Three projects.', titleEm: 'Real', titleB: 'numbers.',
    problem: 'Problem', solution: 'Solution', stack: 'Stack', outcomes: 'Outcomes',
    visit: 'Visit site', seeAll: 'See all 50+ projects',
  },
  testimonials: { eyebrow: 'What clients say', titleA: 'Long relationships,', titleEm: 'not', titleB: 'one-off invoices.' },
  clients: { eyebrow: 'Our Valued Clients', title: 'Trusted by Businesses Worldwide' },
  community: {
    eyebrow: 'Community', title: 'We run the Awadh Tech Community', n: '300+', nl: 'members',
    blurb: 'A meetup group for developers, founders and students in Ayodhya and across Awadh — talks, workshops and hiring, hosted by our team.',
    cta: 'Join on Meetup',
  },
  cta: {
    eyebrow: "Let's build something good", titleA: 'Have an idea?', titleEm: 'Bring it to Awadh.',
    lede: "Whether it's a website, a mobile app, an AI agent or a 6-month growth campaign — we'll tell you, honestly, whether we're the right team for it.",
    primary: 'Book a strategy call', wa: 'WhatsApp us', ai: 'Ask the AI first',
  },
  footer: {
    blurb: 'Inspired by our heritage, committed to building a digital future.',
    quick: 'Quick Links', contact: 'Contact Us', rights: 'All Rights Reserved.',
    privacy: 'Privacy Policy', terms: 'Terms & Conditions', meetup: 'Awadh Tech Community · 300+ members',
  },
  fab: { wa: 'WhatsApp us', ai: 'Ask our AI', open: 'Contact options' },
  bot: {
    name: 'Awadh AI', online: 'Online · live demo', input: 'Ask about pricing, timelines, anything…',
    greet: "Namaste 🪔 I'm Awadh AI — ask me anything about our services, timelines, pricing, or how we'd approach your project.",
    offline: "Thanks for reaching out! The live AI assistant isn't connected on this site yet. For a quick answer, WhatsApp us or use the contact form — a real person replies within a few hours.",
    error: "I'm having trouble connecting. Please WhatsApp us at +91 70116 50803 or email info@awadhsoftwaresolutions.com — we'll respond within a few hours.",
    suggestions: [
      'What does a basic website cost?',
      'How long for a mobile app?',
      'Can you build an AI chatbot for my business?',
      'Do you do SEO for local Ayodhya businesses?',
    ],
    close: 'Close', send: 'Send',
  },
  lang: { en: 'EN', hi: 'हिं', label: 'Language' },
};

export type Strings = typeof en;

const hi: Strings = {
  nav: { home: 'होम', about: 'हमारे बारे में', services: 'सेवाएँ', work: 'पोर्टफोलियो', contact: 'संपर्क करें', quote: 'मुफ़्त कोटेशन पाएँ', menu: 'मेनू' },
  hero: {
    titlePre: '',
    titleAccent: 'बेहतर कल',
    titlePost: ' के लिए डिजिटल समाधान',
    lede: 'अवध सॉफ़्टवेयर अयोध्या स्थित एक सॉफ़्टवेयर डेवलपमेंट कंपनी है, जो दुनिया भर के व्यवसायों को नवीन, विश्वसनीय और स्केलेबल डिजिटल समाधान प्रदान करती है।',
    cta1: 'सेवाएँ देखें',
    cta2: 'हमारा काम देखें',
    photoAlt: 'सूर्यास्त के समय सरयू तट पर अयोध्या के मंदिर',
    stats: [
      { n: '50+', l: 'संतुष्ट क्लाइंट' },
      { n: '50+', l: 'प्रोजेक्ट डिलीवर' },
      { n: '11+', l: 'वर्षों का अनुभव' },
      { n: '100%', l: 'क्लाइंट संतुष्टि' },
    ],
  },
  services: { eyebrow: 'हम क्या करते हैं', title: 'सेवाएँ जो आपके व्यवसाय को आगे बढ़ाएँ', more: 'और पढ़ें' },
  band: {
    based: 'गर्व से स्थित —', city: 'अयोध्या',
    blurb: 'हमारी विरासत से प्रेरित, डिजिटल भविष्य के निर्माण के लिए प्रतिबद्ध।',
    items: [
      { t: 'स्थानीय जड़ें', d: 'मज़बूत मूल्य, स्थानीय समझ।' },
      { t: 'वैश्विक दृष्टि', d: 'दुनिया भर के क्लाइंट्स को समाधान।' },
      { t: 'नवाचार-प्रेरित', d: 'प्रभाव बनाने के लिए तकनीक का उपयोग।' },
    ],
  },
  about: {
    eyebrow: 'हमारे बारे में', title: 'तकनीक और नवाचार से व्यवसायों को सशक्त बनाना',
    p1: 'अवध सॉफ्टवेयर सॉल्यूशंस अयोध्या, उत्तर प्रदेश स्थित एक सॉफ्टवेयर डेवलपमेंट और डिजिटल मार्केटिंग स्टूडियो है। 2014 में विष्णु मिश्रा द्वारा स्थापित, हम 11+ वर्षों से भारत और दुनिया भर के क्लाइंट्स के लिए वेब ऐप, मोबाइल ऐप, AI उत्पाद और ग्रोथ इंजन बना रहे हैं।',
    p2: 'हमारी टीम गहरी तकनीकी विशेषज्ञता और रचनात्मक सोच के साथ ऐसा सॉफ्टवेयर बनाती है जो नवीन, उपयोगकर्ता-केंद्रित और स्केलेबल हो।',
    points: ['क्लाइंट-केंद्रित दृष्टिकोण', 'समय पर डिलीवरी और गुणवत्ता आश्वासन', 'किफ़ायती और पारदर्शी मूल्य'],
    cta: 'हमारे बारे में और जानें', badgeN: '11+', badgeL: 'वर्षों का अनुभव',
    imgAlt: 'शाम के समय अयोध्या के तटवर्ती मंदिर', teamAlt: 'अयोध्या कार्यालय में काम करती अवध सॉफ़्टवेयर टीम',
  },
  tech: { eyebrow: 'हमारी तकनीकें', title: 'आधुनिक समाधानों के लिए आधुनिक तकनीक' },
  why: {
    eyebrow: 'अवध सॉफ्टवेयर ही क्यों?', title1: 'आपकी सफलता', title2: 'हमारी प्रतिबद्धता है',
    items: [
      { t: 'कस्टमाइज़्ड समाधान', d: 'आपके व्यवसाय की विशिष्ट आवश्यकताओं के अनुरूप समाधान।' },
      { t: 'समय पर डिलीवरी', d: 'हम आपके समय का सम्मान करते हैं और हर प्रोजेक्ट समय पर पहुँचाते हैं।' },
      { t: 'गुणवत्ता आश्वासन', d: 'बग-फ्री और विश्वसनीय समाधान के लिए सर्वोत्तम प्रथाएँ।' },
      { t: 'समर्पित सहयोग', d: 'हमारी सपोर्ट टीम हर समय आपकी सहायता के लिए तैयार है।' },
    ],
  },
  cases: {
    eyebrow: 'केस स्टडीज़ · मापे गए परिणाम', titleA: 'तीन प्रोजेक्ट।', titleEm: 'असली', titleB: 'आँकड़े।',
    problem: 'समस्या', solution: 'समाधान', stack: 'स्टैक', outcomes: 'परिणाम',
    visit: 'साइट देखें', seeAll: 'सभी 50+ प्रोजेक्ट देखें',
  },
  testimonials: { eyebrow: 'क्लाइंट्स का कहना', titleA: 'लंबे रिश्ते,', titleEm: 'न कि', titleB: 'एक-बार के बिल।' },
  clients: { eyebrow: 'हमारे प्रतिष्ठित क्लाइंट', title: 'दुनिया भर के व्यवसायों का विश्वास' },
  community: {
    eyebrow: 'समुदाय', title: 'हम अवध टेक कम्युनिटी चलाते हैं', n: '300+', nl: 'सदस्य',
    blurb: 'अयोध्या और पूरे अवध के डेवलपर्स, फाउंडर्स और छात्रों के लिए एक मीटअप समूह — टॉक, वर्कशॉप और हायरिंग, हमारी टीम द्वारा आयोजित।',
    cta: 'मीटअप पर जुड़ें',
  },
  cta: {
    eyebrow: 'चलिए कुछ अच्छा बनाते हैं', titleA: 'कोई आइडिया है?', titleEm: 'अवध को बताइए।',
    lede: 'वेबसाइट हो, मोबाइल ऐप, AI एजेंट या 6-महीने का ग्रोथ कैंपेन — हम ईमानदारी से बताएँगे कि हम सही टीम हैं या नहीं।',
    primary: 'स्ट्रेटेजी कॉल बुक करें', wa: 'व्हाट्सऐप करें', ai: 'पहले AI से पूछें',
  },
  footer: {
    blurb: 'हमारी विरासत से प्रेरित, डिजिटल भविष्य के निर्माण के लिए प्रतिबद्ध।',
    quick: 'त्वरित लिंक', contact: 'संपर्क करें', rights: 'सर्वाधिकार सुरक्षित।',
    privacy: 'गोपनीयता नीति', terms: 'नियम व शर्तें', meetup: 'अवध टेक कम्युनिटी · 300+ सदस्य',
  },
  fab: { wa: 'व्हाट्सऐप करें', ai: 'AI से पूछें', open: 'संपर्क विकल्प' },
  bot: {
    name: 'अवध AI', online: 'ऑनलाइन · लाइव डेमो', input: 'मूल्य, समय-सीमा, कुछ भी पूछिए…',
    greet: 'नमस्ते 🪔 मैं अवध AI हूँ — हमारी सेवाओं, समय-सीमा, मूल्य या आपके प्रोजेक्ट पर हमारी सोच के बारे में कुछ भी पूछिए।',
    offline: 'संपर्क करने के लिए धन्यवाद! इस साइट पर लाइव AI असिस्टेंट अभी जुड़ा नहीं है। त्वरित उत्तर के लिए हमें WhatsApp करें या संपर्क फ़ॉर्म भरें — कुछ ही घंटों में एक वास्तविक व्यक्ति जवाब देगा।',
    error: 'कनेक्शन में दिक़्क़त है। कृपया +91 70116 50803 पर WhatsApp करें या info@awadhsoftwaresolutions.com पर ईमेल करें — हम कुछ ही घंटों में जवाब देंगे।',
    suggestions: [
      'एक बेसिक वेबसाइट का खर्च क्या होगा?',
      'मोबाइल ऐप बनाने में कितना समय लगेगा?',
      'क्या आप मेरे बिज़नेस के लिए AI चैटबॉट बना सकते हैं?',
      'क्या आप अयोध्या के लोकल बिज़नेस के लिए SEO करते हैं?',
    ],
    close: 'बंद करें', send: 'भेजें',
  },
  lang: { en: 'EN', hi: 'हिं', label: 'भाषा' },
};

export const STRINGS = { en, hi } as const;
export type Lang = keyof typeof STRINGS;
