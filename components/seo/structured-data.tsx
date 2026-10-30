import React from 'react';

export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tawwakal Automation",
    "alternateName": ["Tawwakal Marine & Industrial Supply", "Tawwakal Automation Alang"],
    "url": "https://tawwakalautomation.com",
    "logo": "https://tawwakalautomation.com/icon.svg",
    "description": "Global stockist and exporter of marine and industrial automation equipment, PLCs, HMIs, VFD drives, navigation electronics, and genuine surplus spare parts.",
    "email": "sales@tawwakalautomation.com",
    "telephone": "+916356547827",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+916356547827",
        "email": "sales@tawwakalautomation.com",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Hindi", "Gujarati"]
      }
    ]
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tawwakal Automation",
    "image": "https://tawwakalautomation.com/hero-bg.webp",
    "url": "https://tawwakalautomation.com",
    "telephone": "+916356547827",
    "email": "sales@tawwakalautomation.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhavnagar",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.7645",
      "longitude": "72.1519"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tawwakal Automation",
    "url": "https://tawwakalautomation.com",
    "description": "B2B supplier of marine equipment, ship spare parts, industrial automation products, and electrical and mechanical components.",
    "publisher": {
      "@type": "Organization",
      "name": "Tawwakal Automation",
      "url": "https://tawwakalautomation.com"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://tawwakalautomation.com/products?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
