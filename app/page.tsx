import Hero from '@/components/Hero';
import { AboutBlock, AyodhyaBand, CaseStudies, ClientsStrip, Community, FinalCTA, ServicesGrid, TechRow, Testimonials, WhyChoose } from '@/components/HomeSections';
import { SITE } from '@/lib/site';

export default function HomePage() {
  return (
    <main>
      {/* Crawler / LLM-friendly summary — visually hidden, kept in the DOM. */}
      <div className="llm-only">
        <p><strong>{SITE.name} — Software Development &amp; Digital Marketing Company in Ayodhya, India</strong></p>
        <p>{SITE.name} (awadhsoftware.com) is a software development and digital marketing agency based in Ayodhya, Uttar Pradesh, India. Founded in 2014 by {SITE.founder}, the company has 11+ years of experience and has shipped 50+ projects.</p>
        <p>Services: Web application development (React, Next.js, Node.js), iOS and Android mobile app development, AI / ML and agentic product development, AI chatbot development, Digital marketing on Google and Meta, SEO and LLM SEO (Generative Engine Optimization).</p>
        <p>Notable clients and products: ayodhyadham.info, freeup.net, adventureamore.com. Community: Awadh Tech Community meetup group with 300+ members.</p>
        <p>Contact: {SITE.phoneDisplay}, {SITE.email}, {SITE.address.display}, India. Founder profile: linkedin.com/in/cyberbaba, github.com/vishnumishra.</p>
        <p>Service areas: Ayodhya, Lucknow, Uttar Pradesh, all of India, and international clients.</p>
      </div>
      <Hero />
      <ServicesGrid />
      <AyodhyaBand />
      <AboutBlock />
      <TechRow />
      <WhyChoose />
      <CaseStudies />
      <Testimonials />
      <ClientsStrip />
      <Community />
      <FinalCTA />
    </main>
  );
}
