import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const requests = [];
  page.on('response', async (response) => {
    try {
      const url = response.url();
      if (url.startsWith('data:')) return;
      
      const headers = response.headers();
      let size = 0;
      if (headers['content-length']) {
        size = parseInt(headers['content-length'], 10);
      } else {
        const buffer = await response.buffer().catch(() => null);
        if (buffer) size = buffer.length;
      }
      
      requests.push({
        url: url,
        size
      });
    } catch (e) {
      // Ignore
    }
  });

  await page.goto('http://localhost:8081/', { waitUntil: 'networkidle0', timeout: 30000 });

  const metrics = await page.evaluate(() => {
    const timing = performance.timing;
    const initialPageLoad = timing.loadEventEnd - timing.navigationStart;
    const domRender = timing.domContentLoadedEventEnd - timing.navigationStart;
    const iframes = Array.from(document.querySelectorAll('iframe')).map(i => i.src);
    
    // Check if lightweight IndiaHeatmap is rendering
    // Our IndiaHeatmap typically uses responsive container, svg or canvas. 
    // We can also check if the text "India Air Quality Risk Map" is present.
    const hasHeatmapTitle = document.body.innerText.includes('India Air Quality Risk Map');
    
    return { initialPageLoad, domRender, iframes, hasHeatmapTitle };
  });

  requests.sort((a, b) => b.size - a.size);
  const top5 = requests.slice(0, 5);
  const totalSize = requests.reduce((acc, r) => acc + r.size, 0);

  console.log("--- PERFORMANCE REPORT ---");
  console.log(`Initial Page Load Time: ${metrics.initialPageLoad} ms`);
  console.log(`DOM/Content Render Time: ${metrics.domRender} ms`);
  console.log(`Total Transferred Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Iframes found: ${metrics.iframes.length}`);
  if (metrics.iframes.length > 0) console.log(`Iframe srcs: ${metrics.iframes.join(', ')}`);
  console.log(`Heatmap title found: ${metrics.hasHeatmapTitle}`);
  console.log("\nTop 5 Largest Requests:");
  top5.forEach((r, i) => {
    const name = r.url.split('/').pop().split('?')[0] || r.url;
    console.log(`${i + 1}. ${name} - ${(r.size / 1024).toFixed(2)} KB`);
  });
  
  await browser.close();
})();
