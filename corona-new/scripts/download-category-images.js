const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    // Ensure URL has https:
    let cleanUrl = url;
    if (cleanUrl.startsWith('//')) {
      cleanUrl = 'https:' + cleanUrl;
    }
    // Remove query params for clean download
    const fetchUrl = cleanUrl.split('?')[0];

    https.get(fetchUrl, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(destPath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed with status: ${response.statusCode} for ${fetchUrl}`));
      }
    }).on('error', reject);
  });
}

async function scrapeAllCategoryImages() {
  const destDir = path.join(__dirname, '..', 'public', 'categories');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  console.log("Fetching collections from https://aeliyamarinetech.com/collections.json ...");
  const res = await fetch('https://aeliyamarinetech.com/collections.json?limit=100', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch collections.json: ${res.status}`);
  }

  const data = await res.json();
  const collections = data.collections || [];
  console.log(`Discovered ${collections.length} collections on Aeliya Marine Tech.`);

  const downloaded = [];

  for (const col of collections) {
    if (!col.image || !col.image.src) continue;

    const ext = path.extname(col.image.src.split('?')[0]) || '.png';
    const filename = `${col.handle}${ext}`;
    const targetFile = path.join(destDir, filename);

    try {
      console.log(`Downloading: [${col.title}] => ${filename}`);
      await downloadImage(col.image.src, targetFile);
      downloaded.push({
        id: col.id,
        title: col.title,
        handle: col.handle,
        localPath: `/categories/${filename}`
      });
    } catch (err) {
      console.error(`Failed to download ${col.handle}: ${err.message}`);
    }
  }

  console.log(`\nSuccessfully downloaded ${downloaded.length} category images into public/categories/!`);
  fs.writeFileSync(
    path.join(__dirname, 'downloaded-categories.json'),
    JSON.stringify(downloaded, null, 2)
  );
}

scrapeAllCategoryImages().catch(console.error);

