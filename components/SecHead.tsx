import type { CSSProperties } from 'react';

// Centered section header: orange eyebrow, navy title, orange double underline.
export default function SecHead({ eyebrow, title, style, align = 'center', as: Tag = 'h2' }: {
  eyebrow: string; title: string; style?: CSSProperties; align?: 'center' | 'left'; as?: 'h1' | 'h2';
}) {
  return (
    <div style={{ textAlign: align, marginBottom: 48, ...style }}>
      <div className="sec-eyebrow">{eyebrow}</div>
      <Tag className="display sec-title">{title}</Tag>
      <div className={align === 'left' ? 'sec-underline left' : 'sec-underline'}><span /><span /></div>
    </div>
  );
}
