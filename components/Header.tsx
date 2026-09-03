'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { SITE, WHATSAPP_URL } from '@/lib/site';
import { Arrow, Github, Linkedin, Mail, Menu, Phone, Pin, WhatsApp } from './Icons';
import s from './Header.module.css';

export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about/', key: 'about' },
  { href: '/services/', key: 'services' },
  { href: '/portfolio/', key: 'work' },
  { href: '/contact/', key: 'contact' },
] as const;

function TopBar() {
  return (
    <div className={`${s.topbar} desktop-only`}>
      <div className={`container ${s.topbarInner}`}>
        <div className={s.topbarGroup}>
          <span className={s.topbarItem}><Pin size={16} />{SITE.address.city}, {SITE.address.region}, India</span>
          <a className={s.topbarItem} href={`mailto:${SITE.email}`}><Mail size={16} />{SITE.email}</a>
        </div>
        <div className={`${s.topbarGroup} ${s.right}`}>
          <a className={s.topbarItem} href={`tel:${SITE.phone}`}><Phone size={16} />{SITE.phoneDisplay}</a>
          <span className={s.divider} />
          <div className={s.social}>
            <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={SITE.social.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsApp size={18} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className={s.langToggle} role="group" aria-label={t.lang.label}>
      {(['en', 'hi'] as const).map((v) => (
        <button key={v} type="button" onClick={() => setLang(v)} aria-pressed={lang === v} lang={v}>{t.lang[v]}</button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <TopBar />
      <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
        <div className={`container ${s.headerInner}`}>
          <Link href="/" className={s.logo} aria-label={`${SITE.shortName} home`}>
            <img src="/images/awadh-logo.png" alt={SITE.shortName} width={278} height={94} />
          </Link>
          <nav className={`${s.nav} desktop-only`} aria-label="Primary">
            {NAV_ITEMS.map((it) => (
              <Link key={it.key} href={it.href} className={`${s.navLink} ${isActive(it.href) ? s.active : ''}`} aria-current={isActive(it.href) ? 'page' : undefined}>
                {t.nav[it.key]}
              </Link>
            ))}
          </nav>
          <div className={s.actions}>
            <LangToggle />
            <Link href="/contact/" className={`btn btn-primary desktop-only ${s.quote}`}>{t.nav.quote} <Arrow /></Link>
            <button type="button" className={`${s.burger} mobile-only`} onClick={() => setOpen((o) => !o)} aria-label={t.nav.menu} aria-expanded={open} aria-controls="mobile-menu">
              <Menu />
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-menu" className={`${s.mobileMenu} mobile-only`}>
            <div className={`container ${s.mobileMenuInner}`}>
              {NAV_ITEMS.map((it) => (
                <Link key={it.key} href={it.href} className={`${s.mobileLink} ${isActive(it.href) ? s.active : ''}`}>{t.nav[it.key]}</Link>
              ))}
              <Link href="/contact/" className={`btn btn-primary ${s.mobileQuote}`}>{t.nav.quote} <Arrow /></Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
