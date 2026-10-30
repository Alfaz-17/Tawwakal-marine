import React from 'react';

type BlogStructuredDataProps = {
  blog: {
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author?: string;
  };
  slug: string;
};

export default function BlogStructuredData({ blog, slug }: BlogStructuredDataProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [blog.image],
    "datePublished": blog.date,
    "author": [{
        "@type": "Organization",
        "name": "Tawwakal Automation",
        "url": "https://tawwakalautomation.com"
      }],
    "publisher": {
      "@type": "Organization",
      "name": "Tawwakal Automation",
      "url": "https://tawwakalautomation.com"
    },
    "description": blog.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tawwakalautomation.com/blog/${slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}
