const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const svgPath = path.join(__dirname, '..', 'public', 'icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Render PNGs at various sizes
  console.log('Rendering high-res icons from SVG...');
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Write Apple Touch Icons & PWA icons
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(__dirname, '..', 'app', 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-light-32x32.png'), png32);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-dark-32x32.png'), png32);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-192.png'), png192);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-512.png'), png512);

  // 2. Build standard .ico file containing PNG frames (16x16, 32x32, 48x48)
  // An ICO header consists of:
  // 6 bytes header (idReserved: 0, idType: 1, idCount: N)
  // 16 bytes per entry: width, height, colors, reserved, planes, bpp, size, offset
  const images = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved (0)
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(images.length, 4); // Number of images

  let offset = 6 + images.length * 16;
  const directoryEntries = [];
  const imageBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset to image data

    directoryEntries.push(entry);
    imageBuffers.push(img.buffer);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...directoryEntries, ...imageBuffers]);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '..', 'app', 'favicon.ico'), icoBuffer);

  // 3. Render 1200x630 OpenGraph / Twitter Social Card (og-image.png)
  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#04122E" />
          <stop offset="60%" stop-color="#071A3F" />
          <stop offset="100%" stop-color="#002D3E" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00D2DE" />
          <stop offset="100%" stop-color="#008C95" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#ogBg)" />
      
      <!-- Subtle Grid Pattern -->
      <g stroke="#ffffff" stroke-width="1" opacity="0.05">
        <line x1="0" y1="105" x2="1200" y2="105" />
        <line x1="0" y1="210" x2="1200" y2="210" />
        <line x1="0" y1="315" x2="1200" y2="315" />
        <line x1="0" y1="420" x2="1200" y2="420" />
        <line x1="0" y1="525" x2="1200" y2="525" />
        <line x1="200" y1="0" x2="200" y2="630" />
        <line x1="400" y1="0" x2="400" y2="630" />
        <line x1="600" y1="0" x2="600" y2="630" />
        <line x1="800" y1="0" x2="800" y2="630" />
        <line x1="1000" y1="0" x2="1000" y2="630" />
      </g>

      <!-- Glow Circles -->
      <circle cx="1050" cy="150" r="280" fill="#00D2DE" opacity="0.08" filter="blur(60px)" />
      <circle cx="150" cy="500" r="220" fill="#008C95" opacity="0.08" filter="blur(50px)" />

      <!-- Top Badge -->
      <rect x="90" y="80" width="360" height="36" rx="18" fill="#008C95" fill-opacity="0.2" stroke="#00D2DE" stroke-opacity="0.4" stroke-width="1.5" />
      <text x="270" y="103" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#00D2DE" text-anchor="middle" letter-spacing="3">ALANG &amp; BHAVNAGAR STOCKIST</text>

      <!-- Headline -->
      <text x="90" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">TAWWAKAL AUTOMATION</text>
      <text x="90" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="url(#accentGrad)" letter-spacing="0">INDUSTRIAL &amp; MARINE SPARE PARTS</text>
      
      <!-- Subheadline -->
      <text x="90" y="315" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#CBD5E1">Global Supplier of Genuine Tested PLCs, Drives, HMIs &amp; Marine Electronics</text>

      <!-- Divider -->
      <line x1="90" y1="365" x2="850" y2="365" stroke="#334155" stroke-width="2" />

      <!-- Feature Badges -->
      <g transform="translate(90, 405)">
        <rect width="210" height="70" rx="12" fill="#0F244F" stroke="#1E3A8A" stroke-width="1.5" />
        <text x="25" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" letter-spacing="1">DISPATCH</text>
        <text x="25" y="52" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">24-48 Hours Express</text>
      </g>

      <g transform="translate(325, 405)">
        <rect width="210" height="70" rx="12" fill="#0F244F" stroke="#1E3A8A" stroke-width="1.5" />
        <text x="25" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" letter-spacing="1">QUALITY</text>
        <text x="25" y="52" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">100% Bench Tested</text>
      </g>

      <g transform="translate(560, 405)">
        <rect width="210" height="70" rx="12" fill="#0F244F" stroke="#1E3A8A" stroke-width="1.5" />
        <text x="25" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" letter-spacing="1">GLOBAL LOGISTICS</text>
        <text x="25" y="52" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">Air Port Delivery</text>
      </g>

      <!-- Contact Info Bar -->
      <text x="90" y="545" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#94A3B8">Website: <tspan fill="#38BDF8">tawwakalautomation.com</tspan>   |   Email: <tspan fill="#FFFFFF">sales@tawwakalautomation.com</tspan>   |   Phone: <tspan fill="#FFFFFF">+91 6356547827</tspan></text>
    </svg>
  `;

  const ogPng = await sharp(Buffer.from(ogSvg)).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'og-image.png'), ogPng);

  console.log('✔ All favicons (ICO 16/32/48, Apple Touch Icon, PWA 192/512, OG image 1200x630) generated successfully!');
}

generate().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
