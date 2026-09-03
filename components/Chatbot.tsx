'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { ENV, WHATSAPP_INTRO } from '@/lib/site';
import { useChat } from './ChatProvider';
import { Close, Send, Spark, WhatsApp } from './Icons';
import s from './Chatbot.module.css';

type Msg = { role: 'user' | 'assistant'; content: string; link?: boolean };

// "Awadh AI" panel. Talks to NEXT_PUBLIC_CHAT_ENDPOINT when configured; otherwise
// it answers with a WhatsApp hand-off so the widget is never a dead end.
export default function Chatbot() {
  const { t, lang } = useLang();
  const { open, setOpen } = useChat();
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: t.bot.greet }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-greet in the new language while only the welcome message is showing.
  useEffect(() => {
    setMessages((prev) => (prev.length <= 1 ? [{ role: 'assistant', content: t.bot.greet }] : prev));
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      if (!ENV.chatEndpoint) {
        await new Promise((r) => setTimeout(r, 600));
        setMessages([...next, { role: 'assistant', content: t.bot.offline, link: true }]);
        return;
      }
      const res = await fetch(ENV.chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })), lang }),
      });
      if (!res.ok) throw new Error(`chat endpoint ${res.status}`);
      const data = (await res.json()) as { reply?: string };
      if (!data.reply) throw new Error('empty reply');
      setMessages([...next, { role: 'assistant', content: data.reply.trim() }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: t.bot.error, link: true }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className={s.overlay} onClick={() => setOpen(false)}>
      <div className={s.panel} role="dialog" aria-modal="true" aria-label={t.bot.name} onClick={(e) => e.stopPropagation()}>
        <div className={s.head}>
          <div className={s.headLeft}>
            <div className={s.avatar}><Spark /></div>
            <div>
              <div className={s.name}>{t.bot.name}</div>
              <div className={`mono ${s.status}`}>{t.bot.online}</div>
            </div>
          </div>
          <button type="button" onClick={() => setOpen(false)} className={`btn btn-ghost ${s.close}`} aria-label={t.bot.close}><Close /></button>
        </div>

        <div ref={scrollRef} className={s.messages}>
          {messages.map((m, i) => (
            <div key={i} className={`${s.msg} ${m.role === 'user' ? s.user : s.bot}`}>
              {m.content}
              {m.link && (
                <a href={WHATSAPP_INTRO} target="_blank" rel="noreferrer" className={s.msgLink}><WhatsApp size={16} /> WhatsApp</a>
              )}
            </div>
          ))}
          {loading && <div className={s.typing} aria-live="polite"><span /><span /><span /></div>}
        </div>

        {messages.length <= 1 && (
          <div className={s.suggestions}>
            {t.bot.suggestions.map((sug) => <button key={sug} type="button" onClick={() => send(sug)}>{sug}</button>)}
          </div>
        )}

        <form className={s.form} onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input ref={inputRef} className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.bot.input} disabled={loading} aria-label={t.bot.input} />
          <button type="submit" className={`btn btn-primary ${s.send}`} disabled={loading || !input.trim()} aria-label={t.bot.send}><Send /></button>
        </form>
      </div>
    </div>
  );
}
