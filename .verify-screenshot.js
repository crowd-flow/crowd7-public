const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const targets = process.argv.slice(2);
  const browser = await chromium.launch();
  for (const t of targets) {
    const [file, out, w, h] = t.split('|');
    const page = await browser.newPage({ viewport: { width: parseInt(w, 10), height: parseInt(h, 10) } });
    await page.goto('file://' + path.resolve(file));
    await page.waitForTimeout(600);
    await page.screenshot({ path: out, fullPage: false });
    await page.close();
    console.log('wrote', out);
  }
  await browser.close();
})();
