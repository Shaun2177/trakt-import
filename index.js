const puppeteer = require('puppeteer');

// Load environment variables (you can install dotenv package for .env file support)
const USERNAME = process.env.USERNAME; // Update this with your email
const PASSWORD = process.env.PASSWORD;

if (!USERNAME || !PASSWORD) {
    console.error('Please set USERNAME and PASSWORD environment variables.');
    process.exit(1);
}

async function run() {
    const startTime = Date.now();

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();

    // Go to the login page
    await page.goto('https://www.stremio.com/login', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('#email');
    await page.waitForSelector('#password');

    await page.type('#email', USERNAME);
    await page.type('#password', PASSWORD);

    // Wait for and scroll to the sign-in button
    await page.waitForSelector('#sign-in-button', { visible: true });
    const signInButton = await page.$('#sign-in-button');
    if (signInButton) {
        // Scroll the button into view with extra space around it
        await page.evaluate((element) => {
            element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        }, signInButton);
        await new Promise(resolve => setTimeout(resolve, 500)); // Reduced wait time
        console.log('Sign-in button scrolled into view');
    }

    try {
        await Promise.all([
            page.click('#sign-in-button'),
            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }),
        ]);
        console.log('Successfully clicked sign-in button and navigated');
    } catch (e) {
        console.log('Navigation error or SPA detected, proceeding...');
        // If navigation doesn't happen, maybe SPA handled it, so continue anyway
    }

    console.log('Logged in!');

    // Go to account settings
    await page.goto('https://www.stremio.com/acc-settings', { waitUntil: 'domcontentloaded' });

    // Wait for the Import button and ensure it's visible
    await page.waitForSelector('button.integrations-button.trakt-sync-button[style*="inline-block"]', { visible: true });

    // Scroll the button into view and click it
    const importButton = await page.$('button.integrations-button.trakt-sync-button[style*="inline-block"]');
    if (importButton) {
        // Scroll the button into view with extra space around it
        await page.evaluate((element) => {
            element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        }, importButton);
        await new Promise(resolve => setTimeout(resolve, 500)); // Reduced wait time

        // Try multiple approaches to ensure the click works
        try {
            await importButton.click();
            console.log('Clicked Import button with element.click()');
        } catch (e) {
            console.log('Element click failed, trying page.click()');
            await page.click('button.integrations-button.trakt-sync-button[style*="inline-block"]');
        }
    } else {
        console.log('Import button not found!');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));  // Reduced wait time

    // Update localStorage key
    await page.evaluate(() => {
        localStorage.setItem('lastTraktImport', '0');
    });

    console.log('Set localStorage.lastTraktImport to "0"');

    // Verify localStorage change
    const lastTraktImport = await page.evaluate(() => localStorage.getItem('lastTraktImport'));
    console.log('Current lastTraktImport:', lastTraktImport);

    // Close browser
    await browser.close();

    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    console.log(`\n🚀 Script completed in ${totalTime} seconds`);
}

run().catch(console.error);
