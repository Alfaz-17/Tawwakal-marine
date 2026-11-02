const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const customIconPath = path.join(__dirname, '..', 'public', 'custom-icon.png');
  const iconBuffer = fs.readFileSync(customIconPath);

  console.log('Generating multi-resolution icons from user-provided custom icon (1254x1254)...');

  // 1. Render PNGs at all standard sizes
  const png16 = await sharp(iconBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(iconBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(iconBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(iconBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(iconBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(iconBuffer).resize(512, 512).png().toBuffer();

  // Save Apple Touch Icons, Standard Icons & PWA icons
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(__dirname, '..', 'app', 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon.png'), png512);
  fs.writeFileSync(path.join(__dirname, '..', 'app', 'icon.png'), png512);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-light-32x32.png'), png32);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-dark-32x32.png'), png32);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-192.png'), png192);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon-512.png'), png512);

  // 2. Build standard multi-resolution .ico file (16x16, 32x32, 48x48)
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

  console.log('✔ All favicons (ICO 16/32/48, Apple Touch Icon 180, icon.png, icon-192, icon-512) generated successfully from user-provided file!');
}

generate().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
