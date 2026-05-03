// Live AI Chatbot Demo — uses window.claude.complete

const Chatbot = ({ open, onClose }) => {
  const { t, lang } = useT();
  const [messages, setMessages] = React.useState([
    { role: 'assistant', content: t('bot_greet') },
  ]);
  // Re-greet when language toggles & only the welcome msg is shown
  React.useEffect(() => {
    setMessages((prev) => prev.length <= 1 ? [{ role: 'assistant', content: t('bot_greet') }] : prev);
  }, [lang, t]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (text) => {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    const next = [...messages, { role: 'user', content: t }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const langInstruction = lang === 'hi'
        ? '\n\nIMPORTANT: Respond in Hindi (Devanagari script). Keep tone warm and professional. You may keep technical English terms like "web app", "SEO", "React Native", "iOS", "Android", "AI" as-is.'
        : '';
      const sys = `You are "Awadh AI", a friendly assistant for Awadh Software Solutions — a software & digital marketing studio in Ayodhya, India (awadhsoftware.com). Founder: Vishnu Mishra, 11+ years experience. We build web apps, iOS & Android apps, AI/ML & agentic products, AI chatbots, and run digital marketing & SEO. We've shipped 50+ projects (e.g. ayodhyadham.info, freeup.net, adventureamore.com). Office: HIG A-11 Saketpuri, Ayodhya. Phone +91 70116 50803, info@awadhsoftwaresolutions.com. Be concise (2-4 sentences usually), warm, professional. Never invent prices — for quotes, ask the user to share scope and offer to connect via WhatsApp or the contact form. Use simple language. You can use a tasteful 🪔 occasionally but don't overdo emoji.${langInstruction}`;
      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content: `${sys}\n\nConversation so far:\n${next.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}\n\nReply as the assistant.` },
        ],
      });
      setMessages([...next, { role: 'assistant', content: reply.trim() }]);
    } catch (e) {
      setMessages([...next, { role: 'assistant', content: lang === 'hi'
        ? 'कनेक्शन में दिक़्क़त है। कृपया +91 70116 50803 पर WhatsApp करें या info@awadhsoftwaresolutions.com पर ईमेल करें — हम कुछ ही घंटों में जवाब देंगे।'
        : "I'm having trouble connecting. Please WhatsApp us at +91 70116 50803 or email info@awadhsoftwaresolutions.com — we'll respond within a few hours." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = lang === 'hi' ? [
    'एक बेसिक वेबसाइट का खर्च क्या होगा?',
    'मोबाइल ऐप बनाने में कितना समय लगेगा?',
    'क्या आप मेरे बिज़नेस के लिए AI चैटबॉट बना सकते हैं?',
    'क्या आप अयोध्या के लोकल बिज़नेस के लिए SEO करते हैं?',
  ] : [
    'What does a basic website cost?',
    'How long for a mobile app?',
    'Can you build an AI chatbot for my business?',
    'Do you do SEO for local Ayodhya businesses?',
  ];

  if (!open) return null;
  return (
    <div className="chatbot-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 60,
      background: 'oklch(0.18 0.01 60 / 0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
      padding: 24,
    }} onClick={onClose}>
      <div className="chatbot-window" onClick={(e) => e.stopPropagation()} style={{
        width: 'min(440px, 100%)', height: 'min(640px, 90vh)',
        background: 'var(--bg)', borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--line)', boxShadow: 'var(--shadow-3)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(180deg, var(--bg-2), var(--bg))',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent-soft)', color: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon.Spark /></div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Awadh AI</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3, background: 'oklch(0.62 0.16 150)', marginRight: 6 }}/>{t('bot_online')}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: 8, borderRadius: 8 }} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '10px 14px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user' ? 'var(--ink)' : 'var(--bg-2)',
              color: m.role === 'user' ? 'var(--bg)' : 'var(--ink)',
              border: m.role === 'user' ? 'none' : '1px solid var(--line)',
              fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap',
            }}>{m.content}</div>
          ))}
          {loading && (
            <div style={{
              alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
              background: 'var(--bg-2)', border: '1px solid var(--line)',
              display: 'flex', gap: 4,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: 3, background: 'var(--ink-3)',
                  animation: `bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
                }}/>
              ))}
            </div>
          )}
        </div>

        {/* suggestions */}
        {messages.length <= 1 && (
          <div style={{ padding: '0 20px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => send(s)} style={{
                padding: '6px 10px', borderRadius: 999,
                background: 'var(--bg-2)', border: '1px solid var(--line)',
                fontSize: 12, color: 'var(--ink-2)',
              }}>{s}</button>
            ))}
          </div>
        )}

        {/* input */}
        <form onSubmit={(e) => { e.preventDefault(); send(); }} style={{
          padding: 16, borderTop: '1px solid var(--line)',
          display: 'flex', gap: 8,
        }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder={t('bot_input')}
            className="input" style={{ flex: 1 }} disabled={loading} />
          <button type="submit" className="btn btn-accent" style={{ padding: '0 16px' }} disabled={loading || !input.trim()}>
            <Icon.Send />
          </button>
        </form>
      </div>
      <style>{`@keyframes bounce { 0%, 80%, 100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-4px); opacity: 1; } }`}</style>
    </div>
  );
};

window.Chatbot = Chatbot;
