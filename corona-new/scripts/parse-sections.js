const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'aeliya-home.html'), 'utf8');

// Find all headings
const clean = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => clean(m[1])).filter(Boolean);
const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => clean(m[1])).filter(Boolean);
const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => clean(m[1])).filter(Boolean);
const h4s = [...html.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)].map(m => clean(m[1])).filter(Boolean);

console.log("=== H1s ===");
console.log(h1s);

console.log("\n=== H2s (Section Headings) ===");
console.log([...new Set(h2s)]);

console.log("\n=== H3s ===");
console.log([...new Set(h3s)].slice(0, 30));

console.log("\n=== H4s ===");
console.log([...new Set(h4s)].slice(0, 30));

// Find sections in order of appearance
const sectionOrder = [];
const regex = /<(?:section|div)[^>]*(?:class|id)=["']([^"']*(?:section|banner|collection|slider|brand|testimonial|feature|about|category|product|newsletter)[^"']*)["'][^>]*>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const identifier = match[1];
  if (!sectionOrder.includes(identifier) && sectionOrder.length < 50) {
    sectionOrder.push(identifier);
  }
}

console.log("\n=== Section / Container Classes in Order ===");
console.log(sectionOrder.slice(0, 25));
