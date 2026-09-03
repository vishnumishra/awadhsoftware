import { SITE } from './site';

// JSON-LD graph for local SEO + LLM parsing: Organization, LocalBusiness,
// ProfessionalService and FAQPage.
export const SCHEMA_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#org`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/images/awadh-logo.png`,
      founder: {
        '@type': 'Person',
        name: SITE.founder,
        url: SITE.social.linkedin,
        sameAs: [SITE.social.linkedin, SITE.social.github],
      },
      foundingDate: SITE.foundingYear,
      description: 'Software development and digital marketing studio building web apps, mobile apps, AI/ML and agentic products, AI chatbots, and running SEO and ad campaigns.',
      sameAs: [SITE.social.linkedin, SITE.social.github, SITE.social.meetup],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE.url}/#local`,
      name: SITE.name,
      image: `${SITE.url}/images/og.jpg`,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      areaServed: ['Ayodhya', 'Lucknow', 'Uttar Pradesh', 'India', 'Worldwide'],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00',
      },
    },
    {
      '@type': 'ProfessionalService',
      name: `${SITE.name} — Software & Digital Marketing`,
      serviceType: [
        'Web application development',
        'Mobile app development (iOS and Android)',
        'AI / ML and agentic product development',
        'AI chatbot development',
        'Digital marketing and Google / Meta ads',
        'SEO and LLM SEO (Generative Engine Optimization)',
      ],
      provider: { '@id': `${SITE.url}/#org` },
      areaServed: ['Ayodhya', 'Lucknow', 'India', 'Worldwide'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does Awadh Software Solutions provide?',
          acceptedAnswer: { '@type': 'Answer', text: 'We provide end-to-end software development (web applications, iOS and Android mobile apps, AI/ML and agentic products, AI chatbots) and digital marketing (SEO, LLM SEO, Google and Meta ads).' },
        },
        {
          '@type': 'Question',
          name: 'Where is Awadh Software Solutions located?',
          acceptedAnswer: { '@type': 'Answer', text: `Our office is at ${SITE.address.display}, India. We also serve clients in Lucknow and across India and the world.` },
        },
        {
          '@type': 'Question',
          name: 'How experienced is the team?',
          acceptedAnswer: { '@type': 'Answer', text: 'Founded in 2014 by Vishnu Mishra, the studio has 11+ years of experience and has shipped 50+ projects across India, the US, UK, UAE and Singapore.' },
        },
        {
          '@type': 'Question',
          name: 'How can I contact you?',
          acceptedAnswer: { '@type': 'Answer', text: `Call or WhatsApp ${SITE.phoneDisplay}, email ${SITE.email}, or use the contact form on awadhsoftware.com.` },
        },
      ],
    },
  ],
};
