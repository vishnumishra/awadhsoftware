import Link from 'next/link';
import { Arrow } from '@/components/Icons';

export default function NotFound() {
  return (
    <main>
      <section className="page-head" style={{ padding: '120px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="sec-eyebrow">404</div>
          <h1 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>That page has moved on.</h1>
          <p className="lede" style={{ margin: '0 auto 28px' }}>The link may be old, or the page may not exist yet. Head back home or tell us what you were looking for.</p>
          <Link href="/" className="btn btn-primary">Back to home <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
