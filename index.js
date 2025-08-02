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
    info: (msg) => console.log(`${colors.blue} ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green} ✓${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow} ⚠${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red} ✗${colors.reset} ${msg}`),
    header: (msg) => console.log(`\n${colors.bright}${colors.magenta}${msg}${colors.reset}`),
    divider: () => process.stdout.write(`${colors.dim}${'─'.repeat(60)}${colors.reset}`)
};

// Load environment variables
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const SCHEDULE_SECONDS = parseInt(process.env.SCHEDULE_SECONDS) || 7200; // Default to 7200 seconds (2 hours)

// Set environment variables for headless server operation (globally, once)
process.env.DISPLAY = process.env.DISPLAY || ':99';
process.env.CHROME_DEVEL_SANDBOX = '/usr/lib/chromium-browser/chrome-sandbox';
process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'true';

if (!EMAIL || !PASSWORD) {
    log.error('Please set EMAIL and PASSWORD environment variables.');
    process.exit(1);
}

let isFirstRun = true;

async function run() {
    const startTime = Date.now();

    log.header('🎬 Stremio Import Automation');
    if (!isFirstRun) {
        log.info(`Next run: ${getNextRunTime(SCHEDULE_SECONDS)}`);
    }

    const browser = await puppeteer.launch({
        headless: true,
        // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });
    const page = await browser.newPage();

    try {
        // Login
        await page.goto('https://www.stremio.com/login', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#email');
        await page.waitForSelector('#password');
        await page.type('#email', EMAIL);
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
        log.divider();

        // Mark that the first run is complete
        isFirstRun = false;
    }
}

function getNextRunTime(seconds) {
    const next = new Date();
    next.setTime(next.getTime() + (seconds * 1000)); // Add milliseconds instead of seconds

    const day = String(next.getDate()).padStart(2, '0');
    const month = String(next.getMonth() + 1).padStart(2, '0');
    const year = next.getFullYear();
    const hours = String(next.getHours()).padStart(2, '0');
    const minutes = String(next.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatDuration(seconds) {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    return `${Math.round(seconds / 3600)} hours`;
}

async function scheduler() {
    log.divider();
    log.header('🚀 Stremio Import Scheduler');

    log.info(`Scheduled to run every ${formatDuration(SCHEDULE_SECONDS)}`);
    log.info(`First run: Starting now...`);
    log.info(`Next run: ${getNextRunTime(SCHEDULE_SECONDS)}`);

    // Run immediately on start
    await run();

    // Schedule recurring runs
    setInterval(async () => {
        try {
            await run();
        } catch (error) {
            log.error(`Scheduled run failed: ${error.message}`);
            // Don't exit, continue with next scheduled run
        }
    }, SCHEDULE_SECONDS * 1000); // Convert seconds to milliseconds
}

scheduler().catch((error) => {
    log.error(`Scheduler failed: ${error.message}`);
    process.exit(1);
});
