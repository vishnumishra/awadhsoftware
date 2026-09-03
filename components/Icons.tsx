// Minimal stroke icons. All are decorative unless a parent provides a label.
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size: number, p: P) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true, ...p });
const stroke = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const Arrow = ({ size = 14, ...p }: P) => (
  <svg {...base(size, p)} viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" {...stroke} /></svg>
);
export const Check = ({ size = 16, ...p }: P) => (
  <svg {...base(size, p)}><path d="M4 12l5 5L20 6" {...stroke} strokeWidth={2} /></svg>
);
export const Spark = ({ size = 16, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" {...stroke} /></svg>
);
export const Send = ({ size = 16, ...p }: P) => (
  <svg {...base(size, p)}><path d="M3 11l18-7-7 18-2-8-9-3Z" {...stroke} /></svg>
);
export const Close = ({ size = 16, ...p }: P) => (
  <svg {...base(size, p)}><path d="M6 6l12 12M18 6L6 18" {...stroke} strokeWidth={1.6} /></svg>
);
export const Menu = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}><path d="M4 6h16M4 12h16M4 18h16" {...stroke} strokeWidth={1.8} /></svg>
);
export const Play = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.4" /><path d="M10 8.8l5.2 3.2-5.2 3.2V8.8z" fill="currentColor" /></svg>
);
export const External = ({ size = 15, ...p }: P) => (
  <svg {...base(size, p)}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" {...stroke} strokeWidth={2} /><path d="M15 3h6v6M10 14L21 3" {...stroke} strokeWidth={2} /></svg>
);
export const Phone = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z" {...stroke} /></svg>
);
export const Mail = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><rect x="3" y="5" width="18" height="14" rx="2" {...stroke} /><path d="M3 7l9 6 9-6" {...stroke} /></svg>
);
export const Pin = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" {...stroke} /><circle cx="12" cy="9" r="2.5" {...stroke} /></svg>
);
export const WhatsApp = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M3 21l1.5-5A8 8 0 1 1 8 19.5L3 21Z" {...stroke} strokeWidth={1.6} /><path d="M9 9c0 4 2 6 6 6 0 0 1.2-.4 1.6-1l-1.8-1.4c-.4.3-.8.6-1.2.4-1-.4-1.7-1-2-2-.2-.4.1-.9.4-1.2L10.6 8C10 8.4 9.6 9 9 9Z" fill="currentColor" /></svg>
);
export const ChatBubble = ({ size = 24, ...p }: P) => (
  <svg {...base(size, p)}><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4c-1.5 0-2.9-.3-4.1-1L3 20l1.2-4.2a8.3 8.3 0 0 1-1.2-4.3A8.4 8.4 0 0 1 11.5 3a8.4 8.4 0 0 1 9.5 8.5z" {...stroke} strokeWidth={1.7} /><circle cx="8.5" cy="11.5" r="1" fill="currentColor" /><circle cx="12.5" cy="11.5" r="1" fill="currentColor" /><circle cx="16.5" cy="11.5" r="1" fill="currentColor" /></svg>
);
export const Plus = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M5 12h14M12 5v14" {...stroke} strokeWidth={2} /></svg>
);
export const Github = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
);
export const Linkedin = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5ZM9 9.5h3.8v1.6h.05c.53-1 1.85-2 3.8-2 4.07 0 4.82 2.68 4.82 6.16V21H17.5v-5.2c0-1.24-.02-2.83-1.72-2.83-1.73 0-2 1.35-2 2.74V21H9V9.5Z" /></svg>
);
export const Quote = (p: SVGProps<SVGSVGElement>) => (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden {...p}><path d="M0 24V14C0 6 4 1 12 0v4c-4 1-6 4-6 8h6v12H0Zm20 0V14c0-8 4-13 12-14v4c-4 1-6 4-6 8h6v12H20Z" fill="currentColor" /></svg>
);
export const CheckDot = (p: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...p}><circle cx="10" cy="10" r="9" stroke="var(--accent)" strokeWidth="1.5" /><path d="M6.5 10.2l2.3 2.3 4.7-4.8" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Orange-stroke pictograms used in the hero stats bar, "Why choose" band and Ayodhya band.
const Picto = ({ children, size = 26, width = 1.5 }: { children: React.ReactNode; size?: number; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
export const StatIcons = [
  <Picto key="clients" size={30}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5" /><circle cx="16.5" cy="8.5" r="2.6" /><path d="M15.5 13.6c2.4.2 4.2 1.6 4.8 4.4" /></Picto>,
  <Picto key="projects" size={30}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9.5h16M8 5V3M16 5V3M8 13h3M8 16.5h5" /></Picto>,
  <Picto key="years" size={30}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></Picto>,
  <Picto key="satisfaction" size={30}><path d="M12 3l7 2.5v5.5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V5.5L12 3z" /><path d="M9 12l2.2 2.2L15.5 9.8" /></Picto>,
];
export const WhyIcons = [
  <Picto key="custom"><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1" /></Picto>,
  <Picto key="time"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></Picto>,
  <Picto key="quality"><path d="M12 3l7 2.5v5.5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V5.5L12 3z" /><path d="M9 12l2.2 2.2L15.5 9.8" /></Picto>,
  <Picto key="support"><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="1.6" /><rect x="17" y="13" width="4" height="6" rx="1.6" /><path d="M19 19v1a2 2 0 0 1-2 2h-3" /></Picto>,
];
export const BandIcons = [
  <Picto key="local" width={1.4}><path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 1 1 13 0c0 4.6-6.5 10-6.5 10z" /><circle cx="12" cy="10.6" r="2.4" /></Picto>,
  <Picto key="global" width={1.4}><circle cx="12" cy="12" r="8.6" /><path d="M3.4 12h17.2M12 3.4c2.2 2.4 3.3 5.4 3.3 8.6s-1.1 6.2-3.3 8.6c-2.2-2.4-3.3-5.4-3.3-8.6S9.8 5.8 12 3.4z" /></Picto>,
  <Picto key="innovation" width={1.4}><path d="M12 3v5M12 16v5M4.6 7.4l3.6 2.1M15.8 14.5l3.6 2.1M19.4 7.4l-3.6 2.1M8.2 14.5l-3.6 2.1" /><circle cx="12" cy="12" r="2.6" /></Picto>,
];
