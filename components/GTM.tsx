import Script from 'next/script';
import { ENV } from '@/lib/site';

// Google Tag Manager — renders nothing unless NEXT_PUBLIC_GTM_ID is set at build time.
export function GTMScript() {
  if (!ENV.gtmId) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ENV.gtmId}');`}
    </Script>
  );
}

export function GTMNoScript() {
  if (!ENV.gtmId) return null;
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${ENV.gtmId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="gtm" />
    </noscript>
  );
}
