// FAQ section — visible on the page and mirrored in the FAQPage JSON-LD in index.html.
// Keep both in sync: schema content must match what users can read on the page.

const FAQ_CONTENT = {
  en: {
    eyebrow: 'FAQ · Straight answers',
    title_a: 'Questions we hear', title_em: 'every', title_b: 'week.',
    lede: "Pricing, timelines, AI search — the things people actually want to know before they call us.",
    more: 'Something else on your mind?',
    cta: 'Ask us directly',
    items: [
      { q: 'What services does Awadh Software Solutions provide?',
        a: 'We provide end-to-end software development — web applications, iOS and Android mobile apps, AI/ML and agentic products, AI chatbots — and digital marketing: SEO, LLM SEO (AI search optimization), and Google and Meta ad campaigns.' },
      { q: 'How much does a website or app cost in Ayodhya?',
        a: 'A professional business website typically starts under ₹1 lakh. Custom web and mobile products usually range from ₹2 lakh to ₹25 lakh+ depending on scope. Share your requirements and we send a fixed, itemised quote within 48 hours — no obligation.' },
      { q: 'How long does it take to build a website or mobile app?',
        a: 'A marketing website ships in 2–4 weeks. An MVP web or mobile app typically takes 6–12 weeks. Larger products run in weekly-demo milestones, so you see working software from the first sprint.' },
      { q: 'Do you provide SEO and digital marketing services in Ayodhya and Lucknow?',
        a: 'Yes. We run technical SEO, local SEO (Google Business Profile), content strategy and paid campaigns on Google, Meta and YouTube for businesses in Ayodhya, Lucknow and across Uttar Pradesh — as well as national and international brands.' },
      { q: 'What is LLM SEO (AI search optimization) and do you offer it?',
        a: 'LLM SEO — also called Generative Engine Optimization (GEO) — makes your business visible inside AI assistants like ChatGPT, Gemini and Perplexity, not just Google. We implement structured data, crawlable content, citations and entity signals so AI engines recommend you. Yes, it is a core service.' },
      { q: 'Can you build AI chatbots in Hindi for WhatsApp?',
        a: 'Yes. We build multilingual (Hindi + English) AI chatbots for WhatsApp, web and voice, connected to your business data and CRM. Our KisaanSetu WhatsApp bot serves 8,000+ farmers in Hindi.' },
      { q: 'Where is Awadh Software Solutions located?',
        a: 'Our office is at HIG A-11, Saketpuri, Ayodhya, Uttar Pradesh, India. We serve clients in Ayodhya, Lucknow, across India, and internationally (US, UK, UAE, Singapore and more).' },
      { q: 'How can I contact Awadh Software Solutions?',
        a: 'Call or WhatsApp +91 70116 50803, email info@awadhsoftwaresolutions.com, or use the contact form on this site. A real human replies within 24 hours.' },
    ],
  },
  hi: {
    eyebrow: 'सामान्य प्रश्न · सीधे जवाब',
    title_a: 'सवाल जो हमसे', title_em: 'हर', title_b: 'हफ़्ते पूछे जाते हैं।',
    lede: 'क़ीमत, समय-सीमा, AI सर्च — वो बातें जो लोग कॉल करने से पहले जानना चाहते हैं।',
    more: 'कुछ और पूछना है?',
    cta: 'सीधे हमसे पूछें',
    items: [
      { q: 'अवध सॉफ़्टवेयर सॉल्यूशंस कौन-सी सेवाएँ देता है?',
        a: 'हम शुरू से अंत तक सॉफ़्टवेयर डेवलपमेंट करते हैं — वेब एप्लिकेशन, iOS व Android मोबाइल ऐप्स, AI/ML व एजेंटिक प्रोडक्ट्स, AI चैटबॉट — और डिजिटल मार्केटिंग: SEO, LLM SEO (AI सर्च ऑप्टिमाइज़ेशन), तथा Google व Meta ऐड कैंपेन।' },
      { q: 'अयोध्या में वेबसाइट या ऐप की लागत कितनी होती है?',
        a: 'एक प्रोफ़ेशनल बिज़नेस वेबसाइट आमतौर पर ₹1 लाख से कम में शुरू होती है। कस्टम वेब और मोबाइल प्रोडक्ट्स स्कोप के अनुसार ₹2 लाख से ₹25 लाख+ तक होते हैं। अपनी ज़रूरतें बताइए — 48 घंटे में फ़िक्स्ड, आइटमाइज़्ड कोटेशन मिलेगा, बिना किसी बाध्यता के।' },
      { q: 'वेबसाइट या मोबाइल ऐप बनने में कितना समय लगता है?',
        a: 'मार्केटिंग वेबसाइट 2–4 हफ़्तों में तैयार होती है। MVP वेब या मोबाइल ऐप में आमतौर पर 6–12 हफ़्ते लगते हैं। बड़े प्रोजेक्ट साप्ताहिक डेमो के साथ चलते हैं — पहले स्प्रिंट से ही आप चलता हुआ सॉफ़्टवेयर देखते हैं।' },
      { q: 'क्या आप अयोध्या और लखनऊ में SEO व डिजिटल मार्केटिंग सेवाएँ देते हैं?',
        a: 'हाँ। हम अयोध्या, लखनऊ और पूरे उत्तर प्रदेश के व्यवसायों के लिए टेक्निकल SEO, लोकल SEO (Google Business Profile), कंटेंट स्ट्रैटेजी और Google, Meta, YouTube पर पेड कैंपेन चलाते हैं — साथ ही राष्ट्रीय व अंतरराष्ट्रीय ब्रांड्स के लिए भी।' },
      { q: 'LLM SEO (AI सर्च ऑप्टिमाइज़ेशन) क्या है, और क्या आप यह करते हैं?',
        a: 'LLM SEO — जिसे Generative Engine Optimization (GEO) भी कहते हैं — आपके बिज़नेस को सिर्फ़ Google में नहीं, बल्कि ChatGPT, Gemini और Perplexity जैसे AI असिस्टेंट्स में भी दिखाता है। हम स्ट्रक्चर्ड डेटा, क्रॉल-योग्य कंटेंट और एंटिटी सिग्नल लागू करते हैं ताकि AI इंजन आपकी सिफ़ारिश करें। हाँ, यह हमारी मुख्य सेवा है।' },
      { q: 'क्या आप WhatsApp के लिए हिन्दी में AI चैटबॉट बना सकते हैं?',
        a: 'हाँ। हम WhatsApp, वेब और वॉइस के लिए बहुभाषी (हिन्दी + अंग्रेज़ी) AI चैटबॉट बनाते हैं, जो आपके बिज़नेस डेटा और CRM से जुड़े होते हैं। हमारा किसानसेतु WhatsApp बॉट 8,000+ किसानों को हिन्दी में सेवा देता है।' },
      { q: 'अवध सॉफ़्टवेयर सॉल्यूशंस कहाँ स्थित है?',
        a: 'हमारा कार्यालय HIG A-11, साकेतपुरी, अयोध्या, उत्तर प्रदेश, भारत में है। हम अयोध्या, लखनऊ, पूरे भारत और अंतरराष्ट्रीय स्तर पर (US, UK, UAE, सिंगापुर आदि) क्लाइंट्स की सेवा करते हैं।' },
      { q: 'अवध सॉफ़्टवेयर सॉल्यूशंस से संपर्क कैसे करें?',
        a: 'कॉल या WhatsApp करें +91 70116 50803 पर, ईमेल करें info@awadhsoftwaresolutions.com पर, या इस साइट के संपर्क फ़ॉर्म का उपयोग करें। 24 घंटे के भीतर एक वास्तविक व्यक्ति जवाब देता है।' },
    ],
  },
};

const FAQSection = ({ setActivePage }) => {
  const { lang } = useT();
  const c = FAQ_CONTENT[lang] || FAQ_CONTENT.en;
  return (
    <section id="faq" style={{ padding: '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{c.eyebrow}</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: 0 }}>
              {c.title_a} <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>{c.title_em}</em> {c.title_b}
            </h2>
          </div>
          <p className="muted" style={{ maxWidth: 380, fontSize: 16 }}>{c.lede}</p>
        </div>

        <div style={{ display: 'grid', gap: 12, maxWidth: 880 }}>
          {c.items.map((item, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary>
                <h3 style={{ display: 'inline', font: 'inherit', margin: 0 }}>{item.q}</h3>
                <span className="faq-chevron" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span className="muted" style={{ fontSize: 15 }}>{c.more}</span>
          <button onClick={() => setActivePage('contact')} className="btn btn-ghost" style={{ padding: '10px 18px', fontSize: 14 }}>{c.cta} <Icon.Arrow /></button>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { FAQSection, FAQ_CONTENT });
