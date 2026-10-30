const https = require('https');
const fs = require('fs');

async function fetchUrl(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  return await res.text();
}

async function inspect() {
  try {
    console.log("Fetching https://aeliyamarinetech.com/ ...");
    const html = await fetchUrl('https://aeliyamarinetech.com/');
    console.log("Length:", html.length);

    // Look for CMS / backend tech
    if (html.includes('wp-content')) console.log("Backend CMS: WordPress / WooCommerce");
    if (html.includes('__NEXT_DATA__')) console.log("Frontend: Next.js");
    if (html.includes('cdn.shopify.com')) console.log("Backend CMS: Shopify");

    // Look for category links
    const categoryMatches = [...html.matchAll(/href=["'](https:\/\/aeliyamarinetech\.com\/(?:product-category|category)[^"']*)["']/gi)];
    const uniqueCatUrls = [...new Set(categoryMatches.map(m => m[1]))];
    console.log("Category URLs found on homepage:", uniqueCatUrls.length);
    console.log("Sample category URLs:", uniqueCatUrls.slice(0, 15));

    // Look for all images with alt tags
    const imgTagMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi)];
    console.log("Images with alt found:", imgTagMatches.length);
    for (const m of imgTagMatches.slice(0, 20)) {
      console.log(`IMG: ${m[1]} | ALT: ${m[2]}`);
    }

  } catch (err) {
    console.error("Error:", err);
  }
}

inspect();
