import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Noto_Sans_Devanagari, Poppins } from 'next/font/google';
import { LangProvider } from '@/lib/i18n';
import { SCHEMA_GRAPH } from '@/lib/schema';
import { SITE } from '@/lib/site';
import { ChatProvider } from '@/components/ChatProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyFab from '@/components/StickyFab';
import Chatbot from '@/components/Chatbot';
import { GTMNoScript, GTMScript } from '@/components/GTM';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--font-poppins', display: 'swap' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '500', '600', '700'], variable: '--font-devanagari', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' });

const DESCRIPTION = 'Awadh Software Solutions is a software development and digital marketing studio in Ayodhya, India. We build web apps, iOS & Android apps, AI/ML & agentic products, AI chatbots, and run SEO and ad campaigns. 11+ years experience, 50+ projects shipped.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Web, Mobile, AI & Digital Marketing in Ayodhya`,
    template: `%s · ${SITE.name}`,
  },
  description: DESCRIPTION,
  keywords: ['software company in Ayodhya', 'web development Ayodhya', 'mobile app development Lucknow', 'AI chatbot development India', 'digital marketing Ayodhya', 'SEO services Lucknow', 'LLM SEO', 'agentic AI', 'React Native development', 'full stack development India', 'awadhsoftware'],
  authors: [{ name: SITE.name, url: SITE.url }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_IN',
    title: `${SITE.name} — Web, Mobile, AI & Digital Marketing`,
    description: 'A software craft studio in Ayodhya. Web apps, mobile apps, AI/ML products, AI chatbots, SEO & ads. 11+ years, 50+ projects.',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Ayodhya riverfront — Awadh Software Solutions' }],
  },
  twitter: { card: 'summary_large_image', title: SITE.name, description: 'Web, mobile, AI & digital marketing — built in Ayodhya.', images: ['/images/og.jpg'] },
  robots: { index: true, follow: true },
  other: {
    'geo.region': 'IN-UP',
    'geo.placename': 'Ayodhya, Uttar Pradesh',
    'geo.position': `${SITE.geo.lat};${SITE.geo.lng}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
  },
};

export const viewport: Viewport = { themeColor: '#021532', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${devanagari.variable} ${mono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_GRAPH) }} />
        <GTMScript />
      </head>
      <body>
        <GTMNoScript />
        <LangProvider>
          <ChatProvider>
            <Header />
            {children}
            <Footer />
            <StickyFab />
            <Chatbot />
          </ChatProvider>
        </LangProvider>
      </body>
    </html>
  );
}
