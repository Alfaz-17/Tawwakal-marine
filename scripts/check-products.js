const fs = require('fs');
const html = fs.readFileSync('corona-new/scripts/aeliya-home.html', 'utf8');

const queries = ['featured-products', 'grid-view-item', 'product-card', 'product_card', 'grid-link'];
for (const q of queries) {
  const idx = html.indexOf(q);
  if (idx !== -1) {
    console.log(`=== FOUND: ${q} ===`);
    console.log(html.substring(idx - 100, idx + 1000).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
    break;
  }
}

