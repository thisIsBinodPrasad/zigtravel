const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const path = require('path');

async function record() {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    ffmpeg_Path: require('@ffmpeg-installer/ffmpeg').path,
    aspectRatio: '16:9'
  });

  const outputPath = 'C:\\Users\\iampr\\.gemini\\antigravity-ide\\brain\\7688db02-a543-489e-812f-2325b311d14e\\zigoholidays_demo.mp4';
  console.log('Output MP4 path:', outputPath);

  await recorder.start(outputPath);

  console.log('Navigating to http://localhost:4200/...');
  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Scroll through Hero & Search Bar
  console.log('Step 1: Hero section...');
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));

  // 2. Destination selector interactions
  console.log('Step 2: Destination selector...');
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));

  // Click Bali pill
  const destButtons = await page.$$('.dest-pill');
  if (destButtons.length > 2) {
    await destButtons[2].click();
    await new Promise(r => setTimeout(r, 1500));
  }

  // Click Europe pill
  if (destButtons.length > 5) {
    await destButtons[5].click();
    await new Promise(r => setTimeout(r, 1500));
  }

  // Click Maldives pill
  if (destButtons.length > 1) {
    await destButtons[1].click();
    await new Promise(r => setTimeout(r, 1500));
  }

  // 3. Scroll to Package Grid
  console.log('Step 3: Package Grid & Itinerary Modal...');
  await page.evaluate(() => window.scrollBy({ top: 500, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));

  // Click View Itinerary on first package card
  const viewItineraryBtns = await page.$$('.btn-details');
  if (viewItineraryBtns.length > 0) {
    await viewItineraryBtns[0].click();
    await new Promise(r => setTimeout(r, 2000));

    // Switch tabs in detail modal
    const modalTabs = await page.$$('.modal-tabs .tab-btn');
    if (modalTabs.length > 1) {
      await modalTabs[1].click(); // Inclusions tab
      await new Promise(r => setTimeout(r, 1500));
    }
    if (modalTabs.length > 2) {
      await modalTabs[2].click(); // Price calculator tab
      await new Promise(r => setTimeout(r, 1800));
    }

    // Close modal
    const closeBtn = await page.$('.close-btn');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // 4. Scroll to Cost Estimator
  console.log('Step 4: Cost Estimator...');
  await page.evaluate(() => window.scrollBy({ top: 700, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 2000));

  // 5. Scroll to Travel Guide & Visa
  console.log('Step 5: Travel Guide...');
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1800));

  // 6. Scroll to Reviews & Footer
  console.log('Step 6: Reviews & Footer...');
  await page.evaluate(() => window.scrollBy({ top: 800, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1800));

  // 7. Click Request Callback to trigger Lead Modal
  console.log('Step 7: Lead Inquiry Modal...');
  const ctaBtn = await page.$('.floating-cta-bar .btn-primary');
  if (ctaBtn) {
    await ctaBtn.click();
    await new Promise(r => setTimeout(r, 2000));

    // Type sample name
    await page.type('.inquiry-input[name="fullName"]', 'Priya Sharma');
    await page.type('.inquiry-input[name="phone"]', '+91 98765 43210');
    await new Promise(r => setTimeout(r, 1500));

    // Submit inquiry
    const submitBtn = await page.$('.submit-btn');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 2500));
    }
  }

  console.log('Stopping recording...');
  await recorder.stop();
  await browser.close();
  console.log('Recording finished successfully! MP4 saved at:', outputPath);
}

record().catch(err => {
  console.error('Error during recording:', err);
  process.exit(1);
});
