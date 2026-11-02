import React from 'react';

export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tawwakal Automation",
    "alternateName": [
      "Tawwakal Marine & Industrial Supply",
      "Tawwakal Automation Alang",
      "Tawwakal Marine Automation"
    ],
    "url": "https://tawwakalautomation.com",
    "logo": "https://tawwakalautomation.com/icon-512.png",
    "image": "https://tawwakalautomation.com/og-image.png",
    "description": "Global stockist and exporter of marine and industrial automation equipment, PLCs, HMIs, VFD drives, navigation electronics, and genuine surplus spare parts.",
    "email": "sales@tawwakalautomation.com",
    "telephone": "+916356547827",
    "sameAs": [
      "https://wa.me/916356547827"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Alang Ship Breaking Yard Road, Kumbharwada",
      "addressLocality": "Bhavnagar",
      "addressRegion": "Gujarat",
      "postalCode": "364001",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+916356547827",
        "email": "sales@tawwakalautomation.com",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Hindi", "Gujarati"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+916356547827",
        "email": "sales@tawwakalautomation.com",
        "areaServed": "Worldwide"
      }
    ]
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "WholesaleStore"],
    "name": "Tawwakal Automation",
    "image": "https://tawwakalautomation.com/og-image.png",
    "url": "https://tawwakalautomation.com",
    "telephone": "+916356547827",
    "email": "sales@tawwakalautomation.com",
    "priceRange": "$$$$",
    "currenciesAccepted": "USD, EUR, GBP, AED, INR",
    "paymentAccepted": "Bank Wire Transfer, TT, LC",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Alang Ship Breaking Yard Road, Kumbharwada",
      "addressLocality": "Bhavnagar",
      "addressRegion": "Gujarat",
      "postalCode": "364001",
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
        "closes": "20:00"
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
      "url": "https://tawwakalautomation.com",
      "logo": "https://tawwakalautomation.com/icon-512.png"
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
