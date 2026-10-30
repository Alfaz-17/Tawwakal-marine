async function inspectCollections() {
  try {
    const res = await fetch('https://aeliyamarinetech.com/collections.json?limit=100', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    console.log("Response status:", res.status);
    if (res.ok) {
      const data = await res.json();
      console.log("Total collections returned:", data.collections ? data.collections.length : 0);
      const list = (data.collections || []).map(c => ({
        id: c.id,
        title: c.title,
        handle: c.handle,
        image: c.image ? c.image.src : null,
        products_count: c.products_count
      }));
      console.log(JSON.stringify(list, null, 2));
    } else {
      // Check HTML navigation for categories
      const pageRes = await fetch('https://aeliyamarinetech.com/collections', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      console.log("Collections HTML status:", pageRes.status);
      const html = await pageRes.text();
      const collectionMatches = [...html.matchAll(/href=["']\/collections\/([^"'\?]+)["']/gi)];
      const uniqueHandles = [...new Set(collectionMatches.map(m => m[1]))];
      console.log("Unique collection handles from HTML:", uniqueHandles);
    }
  } catch (err) {
    console.error("Inspect error:", err.message);
  }
}

inspectCollections();

