'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { SITE, WHATSAPP_URL } from '@/lib/site';
import { NAV_ITEMS } from './Header';
import { External, Github, Linkedin, Mail, Phone, Pin, WhatsApp } from './Icons';
import s from './Footer.module.css';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.grid}>
          <div>
            <img src="/images/awadh-logo-light.png" alt={SITE.shortName} width={278} height={94} className={s.logo} />
            <p className={s.blurb}>{t.footer.blurb}</p>
            <div className={s.social}>
              <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a href={SITE.social.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsApp size={18} /></a>
            </div>
            <a href={SITE.social.meetup} target="_blank" rel="noreferrer" className={s.meetup}>{t.footer.meetup} <External size={13} /></a>
          </div>
          <div>
            <h4 className={s.h4}>{t.footer.quick}</h4>
            <ul className={s.list}>
              {NAV_ITEMS.map((it) => <li key={it.key}><Link href={it.href}>{t.nav[it.key]}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className={s.h4}>{t.footer.contact}</h4>
            <ul className={`${s.list} ${s.contactList}`}>
              <li><Pin size={20} /><span>{SITE.address.display}</span></li>
              <li><Mail size={20} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Phone size={20} /><a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a></li>
            </ul>
          </div>
        </div>
        <div className={s.bottom}>
          <div>© {year} {SITE.name}. {t.footer.rights}</div>
          <div className={s.legal}>
            <a href="#">{t.footer.privacy}</a>
            <a href="#">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
