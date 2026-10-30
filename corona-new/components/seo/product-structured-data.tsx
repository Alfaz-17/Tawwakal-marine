import React from 'react';

type ProductStructuredDataProps = {
  product: {
    _id?: string;
    title: string;
    description: string;
    image: string;
    images?: string[];
    category?: any;
    price?: number;
    availability?: string;
    condition?: string;
    brandName?: string;
    brand?: any;
    sku?: string;
    mpn?: string;
    keywords?: string[];
    reviews?: Array<{ rating: number; userName?: string; comment?: string; date?: string }>;
  };
  slug: string;
};

export default function ProductStructuredData({ product, slug }: ProductStructuredDataProps) {
  const reviewCount = product.reviews?.filter(r => r.rating > 0).length || 0;
  const brandName = product.brandName || (product.brand && product.brand.name) || '';
  const categoryName = product.category?.name || 'Marine & Industrial Equipment';

  const allImages: string[] = [];
  if (product.image) {
    allImages.push(product.image.startsWith('http') ? product.image : `https://tawwakalautomation.com${product.image}`);
  }
  if (product.images && Array.isArray(product.images)) {
    for (const img of product.images) {
      allImages.push(img.startsWith('http') ? img : `https://tawwakalautomation.com${img}`);
    }
  }

  const productData: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": allImages.length > 0 ? allImages : [`https://tawwakalautomation.com/placeholder.jpg`],
    "description": product.description || `${product.title} - ${categoryName} supplied by Tawwakal Automation.`,
    "sku": product.sku || `TA-${slug.toUpperCase().slice(0, 20)}`,
    "mpn": product.mpn || product.sku || (product as any).partNumber || slug,
    "category": categoryName,
    "url": `https://tawwakalautomation.com/product/${slug}`,
  };

  if (brandName) {
    productData["brand"] = {
      "@type": "Brand",
      "name": brandName
    };
  }

  const offerData: Record<string, any> = {
    "@type": "Offer",
    "url": `https://tawwakalautomation.com/product/${slug}`,
    "availability": product.availability === 'out-of-stock'
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock",
    "itemCondition": product.condition === 'new' 
      ? "https://schema.org/NewCondition" 
      : product.condition === 'refurbished'
        ? "https://schema.org/RefurbishedCondition"
        : "https://schema.org/UsedCondition",
    "seller": {
      "@type": "Organization",
      "name": "Tawwakal Automation",
      "url": "https://tawwakalautomation.com"
    }
  };

  if (product.price && product.price > 0) {
    offerData["priceCurrency"] = "USD";
    offerData["price"] = product.price.toFixed(2);
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 1);
    offerData["priceValidUntil"] = validUntil.toISOString().split('T')[0];
  }

  productData["offers"] = offerData;

  if (reviewCount > 0 && product.reviews) {
    const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    productData["aggregateRating"] = {
      "@type": "AggregateRating",
      "ratingValue": (totalRating / reviewCount).toFixed(1),
      "reviewCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    };

    productData["review"] = product.reviews.slice(0, 5).map(r => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": r.userName || "Customer"
      },
      ...(r.comment ? { "reviewBody": r.comment } : {}),
      ...(r.date ? { "datePublished": new Date(r.date).toISOString().split('T')[0] } : {})
    }));
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tawwakalautomation.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://tawwakalautomation.com/products"
      },
      ...(product.category?.name ? [{
        "@type": "ListItem",
        "position": 3,
        "name": product.category.name,
        "item": `https://tawwakalautomation.com/products/${product.category?.slug || product.category?._id}`
      }] : []),
      {
        "@type": "ListItem",
        "position": product.category?.name ? 4 : 3,
        "name": product.title,
        "item": `https://tawwakalautomation.com/product/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
