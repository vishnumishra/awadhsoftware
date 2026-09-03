'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { SITE, WHATSAPP_INTRO } from '@/lib/site';
import { useChat } from './ChatProvider';
import { ChatBubble, Phone, Plus, Spark, WhatsApp } from './Icons';
import s from './StickyFab.module.css';

export default function StickyFab() {
  const { t } = useLang();
  const { setOpen: openChat } = useChat();
  const [open, setOpen] = useState(false);
  return (
    <div className={s.wrap}>
      {open && (
        <div className={s.menu}>
          <a href={WHATSAPP_INTRO} target="_blank" rel="noreferrer" className={`${s.item} ${s.wa}`}><WhatsApp /> {t.fab.wa}</a>
          <a href={`tel:${SITE.phone}`} className={`${s.item} ${s.call}`}><Phone /> {SITE.phoneDisplay}</a>
          <button type="button" onClick={() => { openChat(true); setOpen(false); }} className={`${s.item} ${s.ai}`}><Spark /> {t.fab.ai}</button>
        </div>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={t.fab.open} aria-expanded={open} className={`${s.main} ${open ? s.open : ''}`}>
        {open ? <Plus /> : <ChatBubble />}
      </button>
    </div>
  );
}
