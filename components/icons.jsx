// Minimal stroke icons + Awadh logo + heritage motifs

const Icon = {
  Logo: ({ size = 28 }) => (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none" aria-hidden="true">
      {/* Stylised arched doorway with sun above — Ayodhya jharokha */}
      <path d="M20 4 L20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 4 m-2.5 2.5 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0" fill="currentColor"/>
      <path d="M8 36 L8 22 Q8 12 20 12 Q32 12 32 22 L32 36" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M14 36 L14 26 Q14 20 20 20 Q26 20 26 26 L26 36" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M5 36 L35 36" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Arrow: ({ size = 14 }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowDown: ({ size = 14 }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none">
      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Web: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 8h18M7 6h.01M10 6h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Mobile: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="11" r="1" fill="currentColor"/>
      <circle cx="14" cy="11" r="1" fill="currentColor"/>
      <path d="M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Chat: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 4v-4H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="9" cy="11" r="0.9" fill="currentColor"/>
      <circle cx="12" cy="11" r="0.9" fill="currentColor"/>
      <circle cx="15" cy="11" r="0.9" fill="currentColor"/>
    </svg>
  ),
  Megaphone: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M3 10v4l11 5V5L3 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 8a4 4 0 0 1 0 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 14v4h3v-3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Brush: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M4 20c0-3 4-3 4-6 0-2-2-3-2-5 0-3 4-5 8-5s6 3 6 7-4 9-9 9c-2 0-4-1-4-2-2 1-3 2-3 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M3 21l1.5-5A8 8 0 1 1 8 19.5L3 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 9c0 4 2 6 6 6 0 0 1.2-.4 1.6-1l-1.8-1.4c-.4.3-.8.6-1.2.4-1-.4-1.7-1-2-2-.2-.4.1-.9.4-1.2L10.6 8C10 8.4 9.6 9 9 9Z" fill="currentColor"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Pin: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Spark: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M3 11l18-7-7 18-2-8-9-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5ZM9 9.5h3.8v1.6h.05c.53-1 1.85-2 3.8-2 4.07 0 4.82 2.68 4.82 6.16V21H17.5v-5.2c0-1.24-.02-2.83-1.72-2.83-1.73 0-2 1.35-2 2.74V21H9V9.5Z"/>
    </svg>
  ),
};

window.Icon = Icon;
