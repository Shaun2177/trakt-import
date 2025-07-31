const puppeteer = require('puppeteer');

// Beautiful logging utilities
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

const log = {
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    header: (msg) => console.log(`\n${colors.bright}${colors.magenta}${msg}${colors.reset}`)
};

// Load environment variables (you can install dotenv package for .env file support)
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

if (!USERNAME || !PASSWORD) {
    log.error('Please set USERNAME and PASSWORD environment variables.');
    process.exit(1);
}

async function run() {
    const startTime = Date.now();

    log.header('🎬 Stremio Import Automation');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();

    try {
        // Login
        await page.goto('https://www.stremio.com/login', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#email');
        await page.waitForSelector('#password');
        await page.type('#email', USERNAME);
        await page.type('#password', PASSWORD);

        // Sign in
        await page.waitForSelector('#sign-in-button', { visible: true });
        const signInButton = await page.$('#sign-in-button');
        if (signInButton) {
            await page.evaluate((element) => {
                element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
            }, signInButton);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        try {
            await Promise.all([
                page.click('#sign-in-button'),
                page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }),
            ]);
        } catch (e) {
            log.warning('SPA navigation detected, continuing...');
        }

        log.success('Logged in');

        // Go to settings and click import
        await page.goto('https://www.stremio.com/acc-settings', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('button.integrations-button.trakt-sync-button[style*="inline-block"]', { visible: true });

        const importButton = await page.$('button.integrations-button.trakt-sync-button[style*="inline-block"]');
        if (importButton) {
            await page.evaluate((element) => {
                element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
            }, importButton);
            await new Promise(resolve => setTimeout(resolve, 500));

            try {
                await importButton.click();
            } catch (e) {
                await page.click('button.integrations-button.trakt-sync-button[style*="inline-block"]');
            }
            log.success('Import button clicked');
        } else {
            log.error('Import button not found');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Reset timestamp
        await page.evaluate(() => {
            localStorage.setItem('lastTraktImport', '0');
        });
        log.success('Import timestamp reset');

    } catch (error) {
        log.error(`Failed: ${error.message}`);
        throw error;
    } finally {
        await browser.close();

        const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
        log.success(`Completed in ${totalTime}s`);
    }
} run().catch((error) => {
    log.error(`Fatal error: ${error.message}`);
    process.exit(1);
});
