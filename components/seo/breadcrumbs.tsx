import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Add Home to the beginning
  const allItems = [
    { label: 'Home', href: '/' },
    ...items
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://tawwakalautomation.com${item.href}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full mb-3 sm:mb-6 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
        {allItems.map((item, index) => (
          <li key={`${item.href}-${index}`} className="inline-flex items-center gap-1 sm:gap-1.5 min-w-0">
            {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}
            {index === allItems.length - 1 ? (
              <span className="text-[#0095A8] font-bold truncate max-w-[140px] xs:max-w-[180px] sm:max-w-[320px]" aria-current="page" title={item.label}>
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-[#0095A8] transition-colors inline-flex items-center gap-1 shrink-0 truncate max-w-[110px] sm:max-w-none"
                title={item.label}
              >
                {index === 0 && <Home className="w-3 h-3 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
