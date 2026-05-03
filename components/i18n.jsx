// i18n strings + provider hook
// Language toggle: 'en' | 'hi'

const STRINGS = {
  en: {
    // nav
    nav_home: 'Home', nav_services: 'Services', nav_work: 'Work', nav_about: 'About', nav_contact: 'Contact',
    nav_phone_label: '+91 70116 50803',
    nav_cta: 'Start a project',
    // hero
    hero_eyebrow_a: 'Awadh Software Solutions',
    hero_eyebrow_b: 'Ayodhya · Lucknow · Worldwide',
    hero_title_1: 'Software,', hero_title_em: 'thoughtfully', hero_title_2: 'crafted on the banks', hero_title_3: 'of the Sarayu.',
    hero_lede_a: 'We design and build web apps, mobile apps, AI agents and chatbots — and run the digital marketing that gets them found.',
    hero_lede_b_a: '11+ years', hero_lede_b_b: '50+ shipped projects', hero_lede_b_c: 'one focused team based in Ayodhya.',
    hero_cta_primary: 'Book a strategy call',
    hero_cta_ai: 'Ask our AI assistant',
    hero_cta_work: 'Explore our work',
    quick_answer_label: 'Quick answer · for humans & AI',
    quick_answer: 'Awadh Software Solutions is a full-stack software development and digital marketing studio in Ayodhya, India. We build web apps, iOS & Android apps, AI agents, AI chatbots, and run SEO, LLM-SEO and paid-ads.',
    avail: 'Available for new work · Q2 / Q3 2026',
    yrs: '11+ yrs experience', shipped: '50+ projects shipped', countries: 'Trusted by clients in 8+ countries',
    // services section
    svc_eyebrow: 'What we do',
    svc_title_a: 'One studio.', svc_title_em: 'End-to-end', svc_title_b: 'capability.',
    svc_lede: "From a Figma file to a deployed product to the ad campaign that fills it — we cover the whole arc, so you don't have to coordinate four agencies.",
    // verticals
    v_eyebrow: 'Built for your industry',
    v_title_a: 'Solutions, by', v_title_em: 'vertical', v_title_b: '.',
    v_lede: "We've built the same problem solved differently for hotels, builders, B2B SaaS and temple trusts. Pick yours and we'll show you what's worked.",
    // cases
    case_eyebrow: 'Case studies · Measured outcomes',
    case_title_a: 'Three projects.', case_title_em: 'Real', case_title_b: 'numbers.',
    case_problem: 'Problem', case_solution: 'Solution', case_stack: 'Stack', case_outcomes: 'Outcomes',
    case_see_all: 'See all 50+ projects',
    // portfolio
    port_eyebrow: 'Selected work',
    port_title_a: 'Fifty plus shipped.', port_title_em: 'Six', port_title_b: "we'd like you to meet.",
    port_view_all: 'View all 50+ projects',
    // testimonials
    test_eyebrow: 'What clients say',
    test_title_a: 'Long relationships,', test_title_em: 'not', test_title_b: 'one-off invoices.',
    // process
    proc_eyebrow: 'How we work · Sankalp → Dharohar',
    proc_title_a: 'A six-step rhythm, repeated', proc_title_em: 'fifty', proc_title_b: 'times.',
    // resources
    res_eyebrow: 'Resources & Insights',
    res_title_a: 'Free playbooks, written by', res_title_em: 'practitioners', res_title_b: '.',
    res_lede: "We publish what we learn — usable in your business, whether you hire us or not.",
    res_journal: 'From the journal', res_all: 'All articles',
    // final CTA
    cta_eyebrow: "Let's build something good",
    cta_title_a: 'Have an idea?', cta_title_em: 'Bring it to Awadh.',
    cta_lede: "Whether it's a website, a mobile app, an AI agent or a 6-month growth campaign — we'll tell you, honestly, whether we're the right team for it.",
    cta_wa: 'WhatsApp us', cta_ask_ai: 'Ask the AI first',
    // footer
    f_lede: 'A software craft studio building thoughtful web, mobile, and AI products from the city of Ayodhya — for clients across India and the world.',
    f_services: 'Services', f_studio: 'Studio', f_reach: 'Reach us',
    f_made: 'Made with care in Ayodhya 🪔',
    // chatbot
    bot_greet: "Namaste 🪔 I'm Awadh AI — ask me anything about our services, timelines, pricing, or how we'd approach your project.",
    bot_online: 'Online · live demo',
    bot_input: 'Ask about pricing, timelines, anything…',
    // FAB
    fab_wa: 'WhatsApp us', fab_call: '+91 70116 50803', fab_ai: 'Ask our AI',
  },
  hi: {
    nav_home: 'होम', nav_services: 'सेवाएँ', nav_work: 'कार्य', nav_about: 'हमारे बारे में', nav_contact: 'संपर्क',
    nav_phone_label: '+91 70116 50803',
    nav_cta: 'प्रोजेक्ट शुरू करें',
    hero_eyebrow_a: 'अवध सॉफ़्टवेयर सॉल्यूशंस',
    hero_eyebrow_b: 'अयोध्या · लखनऊ · विश्वभर',
    hero_title_1: 'सॉफ़्टवेयर,', hero_title_em: 'सोच-समझकर', hero_title_2: 'सरयू के तट पर', hero_title_3: 'गढ़ा गया।',
    hero_lede_a: 'हम वेब ऐप्स, मोबाइल ऐप्स, AI एजेंट और चैटबॉट डिज़ाइन व विकसित करते हैं — और उन्हें ग्राहक तक पहुँचाने वाला डिजिटल मार्केटिंग भी संभालते हैं।',
    hero_lede_b_a: '11+ वर्षों का अनुभव', hero_lede_b_b: '50+ प्रोजेक्ट डिलीवर', hero_lede_b_c: 'अयोध्या में एक केंद्रित टीम।',
    hero_cta_primary: 'स्ट्रेटेजी कॉल बुक करें',
    hero_cta_ai: 'हमारे AI से पूछें',
    hero_cta_work: 'हमारा कार्य देखें',
    quick_answer_label: 'त्वरित परिचय · मानवों व AI के लिए',
    quick_answer: 'अवध सॉफ़्टवेयर सॉल्यूशंस अयोध्या, भारत स्थित एक फुल-स्टैक सॉफ़्टवेयर डेवलपमेंट और डिजिटल मार्केटिंग स्टूडियो है। हम वेब ऐप्स, iOS व Android ऐप्स, AI एजेंट, चैटबॉट, और SEO, LLM-SEO तथा पेड-ऐड्स पर काम करते हैं।',
    avail: 'नए प्रोजेक्ट के लिए उपलब्ध · Q2 / Q3 2026',
    yrs: '11+ वर्षों का अनुभव', shipped: '50+ प्रोजेक्ट डिलीवर', countries: '8+ देशों के क्लाइंट्स का विश्वास',
    svc_eyebrow: 'हम क्या करते हैं',
    svc_title_a: 'एक स्टूडियो।', svc_title_em: 'शुरू से अंत तक', svc_title_b: 'क्षमता।',
    svc_lede: 'फिगमा फ़ाइल से लेकर डिप्लॉय किए गए प्रोडक्ट और उसे भरने वाले ऐड कैंपेन तक — हम पूरी यात्रा संभालते हैं, ताकि आपको चार एजेंसियों को साधना न पड़े।',
    v_eyebrow: 'आपके उद्योग के लिए निर्मित',
    v_title_a: 'समाधान,', v_title_em: 'क्षेत्र', v_title_b: ' अनुसार।',
    v_lede: 'हमने वही समस्या होटलों, बिल्डरों, B2B SaaS और मंदिर ट्रस्टों के लिए अलग-अलग हल की है। अपना क्षेत्र चुनिए, हम दिखाएँगे क्या काम आया।',
    case_eyebrow: 'केस स्टडीज़ · मापे गए परिणाम',
    case_title_a: 'तीन प्रोजेक्ट।', case_title_em: 'असली', case_title_b: 'आँकड़े।',
    case_problem: 'समस्या', case_solution: 'समाधान', case_stack: 'स्टैक', case_outcomes: 'परिणाम',
    case_see_all: 'सभी 50+ प्रोजेक्ट देखें',
    port_eyebrow: 'चुने हुए कार्य',
    port_title_a: 'पचास से अधिक डिलीवर।', port_title_em: 'छह', port_title_b: 'जिनसे आपको मिलवाना चाहेंगे।',
    port_view_all: 'सभी 50+ प्रोजेक्ट देखें',
    test_eyebrow: 'क्लाइंट्स का कहना',
    test_title_a: 'लंबे रिश्ते,', test_title_em: 'न कि', test_title_b: 'एक-बार के बिल।',
    proc_eyebrow: 'हमारी कार्यशैली · संकल्प → धरोहर',
    proc_title_a: 'छह चरणों की लय,', proc_title_em: 'पचास', proc_title_b: 'बार दोहराई गई।',
    res_eyebrow: 'संसाधन व अंतर्दृष्टि',
    res_title_a: 'मुफ़्त प्लेबुक, जिन्हें', res_title_em: 'अनुभवी', res_title_b: ' लोगों ने लिखा।',
    res_lede: 'हम जो सीखते हैं वो साझा करते हैं — आप हमें हायर करें या न करें, आपके बिज़नेस में काम आए।',
    res_journal: 'जर्नल से', res_all: 'सभी लेख',
    cta_eyebrow: 'चलिए कुछ अच्छा बनाते हैं',
    cta_title_a: 'कोई आइडिया है?', cta_title_em: 'अवध को बताइए।',
    cta_lede: 'वेबसाइट हो, मोबाइल ऐप, AI एजेंट या 6-महीने का ग्रोथ कैंपेन — हम ईमानदारी से बताएँगे कि हम सही टीम हैं या नहीं।',
    cta_wa: 'व्हाट्सऐप करें', cta_ask_ai: 'पहले AI से पूछें',
    f_lede: 'अयोध्या से वेब, मोबाइल और AI प्रोडक्ट्स बनाने वाला एक सॉफ़्टवेयर क्राफ्ट स्टूडियो — भारत और दुनिया भर के क्लाइंट्स के लिए।',
    f_services: 'सेवाएँ', f_studio: 'स्टूडियो', f_reach: 'संपर्क करें',
    f_made: 'अयोध्या में सावधानी से बना 🪔',
    bot_greet: 'नमस्ते 🪔 मैं अवध AI हूँ — हमारी सेवाओं, समय-सीमा, मूल्य या आपके प्रोजेक्ट पर हमारी सोच के बारे में कुछ भी पूछिए।',
    bot_online: 'ऑनलाइन · लाइव डेमो',
    bot_input: 'मूल्य, समय-सीमा, कुछ भी पूछिए…',
    fab_wa: 'व्हाट्सऐप करें', fab_call: '+91 70116 50803', fab_ai: 'AI से पूछें',
  },
};

const I18nContext = React.createContext({ lang: 'en', t: (k) => k, setLang: () => {} });

const useT = () => React.useContext(I18nContext);

const I18nProvider = ({ lang, setLang, children }) => {
  const t = React.useCallback((k) => (STRINGS[lang] && STRINGS[lang][k]) || STRINGS.en[k] || k, [lang]);
  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);
  return <I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>;
};

Object.assign(window, { STRINGS, I18nContext, I18nProvider, useT });
