// Single source of truth for business facts used across pages, schema and forms.
export const SITE = {
  name: 'Awadh Software Solutions',
  shortName: 'Awadh Software',
  url: 'https://awadhsoftware.com',
  founder: 'Vishnu Mishra',
  foundingYear: '2014',
  phone: '+917011650803',
  phoneDisplay: '+91 70116 50803',
  email: 'info@awadhsoftwaresolutions.com',
  address: {
    street: 'HIG A-11, Saketpuri',
    city: 'Ayodhya',
    region: 'Uttar Pradesh',
    country: 'IN',
    display: 'HIG A-11, Saketpuri, Ayodhya, Uttar Pradesh',
  },
  geo: { lat: 26.7922, lng: 82.1998 },
  social: {
    linkedin: 'https://www.linkedin.com/in/cyberbaba/',
    github: 'https://github.com/vishnumishra',
    meetup: 'https://www.meetup.com/awadh-tech-community/',
  },
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.phone.replace('+', '')}`;
export const whatsappWithText = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
export const WHATSAPP_INTRO = whatsappWithText("Hi Awadh Software Solutions, I'd like to discuss a project.");

// Optional integrations — all read at build time (static export).
export const ENV = {
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || '',
  chatEndpoint: process.env.NEXT_PUBLIC_CHAT_ENDPOINT || '',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
};
