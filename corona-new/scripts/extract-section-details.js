
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'aeliya-home.html'), 'utf8');

function extractAround(text, len = 2000) {
  const idx = html.indexOf(text);
  if (idx === -1) return "NOT FOUND: " + text;
  return html.substring(idx - 100, idx + len);
}

console.log("=== EASY BUYING PROCESS ===");
console.log(extractAround("Easy Buying Process", 1500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));

console.log("\n=== 40K+ HAPPY CUSTOMER GLOBALLY ===");
console.log(extractAround("40K+ Happy Customer", 1500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));

console.log("\n=== FREQUENTLY ASKED QUESTIONS ===");
console.log(extractAround("Frequently Asked Questions", 2500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
