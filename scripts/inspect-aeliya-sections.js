const fs = require('fs');

async function inspectHomepageSections() {
  try {
    console.log("Fetching https://aeliyamarinetech.com/ HTML...");
    const res = await fetch('https://aeliyamarinetech.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = await res.text();
    console.log("HTML length:", html.length);

    // Look for section tags, id attributes, class names containing section
    const sectionMatches = [...html.matchAll(/<section[^>]*id=["']([^"']*)["'][^>]*>/gi)];
    console.log("Sections with ID:", sectionMatches.map(m => m[1]));

    // Look for headings h1, h2, h3
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);

    console.log("\n--- H1 Headings ---");
    console.log(h1s);

    console.log("\n--- H2 Headings (Sections) ---");
    console.log(h2s);

    console.log("\n--- H3 Headings (Subsections) ---");
    console.log(h3s.slice(0, 30));

    // Look for Shopify section comments or class indicators
    const shopifySections = [...html.matchAll(/id=["']shopify-section-([^"']+)["']/gi)].map(m => m[1]);
    console.log("\n--- Shopify Sections Detected ---");
    console.log(shopifySections);

  } catch (err) {
    console.error("Error inspecting sections:", err.message);
  }
}

inspectHomepageSections();
