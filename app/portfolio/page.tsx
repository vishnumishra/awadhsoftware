import type { Metadata } from 'next';
import PortfolioGrid from '@/components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Portfolio · 50+ Projects Shipped',
  description: 'From Ayodhya pilgrimage portals to North-American marketplaces — a sample of the web, mobile, AI and marketing projects Awadh Software Solutions has built and continues to maintain.',
  alternates: { canonical: '/portfolio/' },
};

export default function PortfolioPage() {
  return (
    <main>
      <section className="page-head" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Selected work · 12 of 50+</div>
          <h1 className="display">Things we&rsquo;ve <em className="em">shipped</em>.</h1>
          <p className="lede">From Ayodhya pilgrimage portals to North-American marketplaces — a sample of the products we&rsquo;ve built and continue to maintain.</p>
        </div>
      </section>
      <section>
        <PortfolioGrid />
      </section>
    </main>
  );
}
