import React from 'react';

export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tawwakal Marine & Automation",
    "alternateName": [
      "Tawwakal Marine",
      "Tawwakal Marine Automation",
      "Tawwakal Automation",
      "Tawwakal Marine Spares",
      "Tawwakal Marine & Industrial Supply",
      "Tawwakal Automation Alang"
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
    "name": "Tawwakal Marine & Automation Spares",
    "alternateName": "Tawwakal Marine",
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
    "name": "Tawwakal Marine & Automation",
    "alternateName": "Tawwakal Marine",
    "url": "https://tawwakalautomation.com",
    "description": "B2B supplier of marine equipment, ship spare parts, industrial automation products, and electrical and mechanical components.",
    "publisher": {
      "@type": "Organization",
      "name": "Tawwakal Marine & Automation",
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

  const navigationData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Marine Equipment & Ship Spares",
        "description": "Tested shipboard automation, marine radars, ECDIS, and engine room spares.",
        "url": "https://tawwakalautomation.com/products"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Industrial Automation & PLCs",
        "description": "Siemens, ABB, Danfoss, and Allen-Bradley PLCs, HMIs, and VFD inverters.",
        "url": "https://tawwakalautomation.com/products"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "OEM Brands Directory",
        "description": "Browse genuine parts by manufacturer: Furuno, ABB, Siemens, Danfoss, Omron.",
        "url": "https://tawwakalautomation.com/brands"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "About Tawwakal Marine",
        "description": "Global exporter of marine and industrial electronics based in Bhavnagar / Alang hub.",
        "url": "https://tawwakalautomation.com/about"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Contact & Rapid RFQ Desk",
        "description": "24/7 technical inquiry and international express air freight quotation.",
        "url": "https://tawwakalautomation.com/contact"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "Technical Knowledge Base",
        "description": "Marine equipment troubleshooting guides, obsolete part replacements, and datasheets.",
        "url": "https://tawwakalautomation.com/blog"
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationData) }}
      />
    </>
  );
}
