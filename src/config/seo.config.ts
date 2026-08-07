import { APP_CONFIG } from "./app.config";

export const SEO_CONFIG = {
  defaultTitle: "Vikram Edu Consultants | Premium AI-Powered Study Abroad Platform",
  titleTemplate: "%s | Vikram Edu Consultants",
  description: APP_CONFIG.description,
  siteUrl: APP_CONFIG.url,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_CONFIG.url,
    siteName: APP_CONFIG.name,
    images: [
      {
        url: `${APP_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Vikram Edu Consultants — Empowering Global Education",
      },
    ],
  },
  twitter: {
    handle: "@vikramedu",
    site: "@vikramedu",
    cardType: "summary_large_image",
  },
  organizationSchema: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: APP_CONFIG.legalName,
    alternateName: APP_CONFIG.name,
    url: APP_CONFIG.url,
    logo: `${APP_CONFIG.url}${APP_CONFIG.logoUrl}`,
    email: APP_CONFIG.contact.email,
    telephone: APP_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: APP_CONFIG.branches[0].address,
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500033",
      addressCountry: "IN",
    },
    sameAs: [
      APP_CONFIG.socials.linkedin,
      APP_CONFIG.socials.instagram,
      APP_CONFIG.socials.youtube,
    ],
  },
};
