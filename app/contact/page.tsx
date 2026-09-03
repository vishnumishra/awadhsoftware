import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, Pin, WhatsApp } from '@/components/Icons';
import { SITE, WHATSAPP_URL } from '@/lib/site';
import s from '@/components/Pages.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Tell us about your project — call or WhatsApp ${SITE.phoneDisplay}, email ${SITE.email}, or send a three-step brief. We reply within 24 hours.`,
  alternates: { canonical: '/contact/' },
};

const CHANNELS = [
  { Icon: Phone, label: 'Call', val: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
  { Icon: WhatsApp, label: 'WhatsApp', val: 'Chat with us instantly', href: WHATSAPP_URL },
  { Icon: Mail, label: 'Email', val: SITE.email, href: `mailto:${SITE.email}` },
  { Icon: Pin, label: 'Office (Ayodhya HQ)', val: SITE.address.display, href: `https://maps.google.com/?q=${encodeURIComponent(`${SITE.address.display}, India`)}` },
];

export default function ContactPage() {
  return (
    <main>
      <section className={s.contact}>
        <div className="container">
          <div className={s.contactGrid}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Contact · We reply within 24h</div>
              <h1 className={`display ${s.contactTitle}`}>Tell us about your <em className="em">project</em>.</h1>
              <p className="muted" style={{ fontSize: 16, marginBottom: 32 }}>
                Three quick steps. We use these answers to route you to the right person on day one — not a salesperson, the lead who&rsquo;d actually do your work.
              </p>
              <div className={s.channels}>
                {CHANNELS.map(({ Icon, label, val, href }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`card ${s.channel}`}>
                    <span className={s.channelIcon}><Icon /></span>
                    <span>
                      <span className={`mono ${s.channelLabel}`}>{label}</span>
                      <span className={s.channelVal} style={{ display: 'block' }}>{val}</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className={`card ${s.avail}`}><div><strong>Available now</strong> · Open for new work</div></div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
