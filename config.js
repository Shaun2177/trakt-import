/**
 * Configuration file for Stremio Import Automation
 */

module.exports = {
    // Browser configuration
    browser: {
        headless: true, // Set to false to see the browser in action
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    },

    // Timeout settings (in milliseconds)
    timeouts: {
        navigation: 5000,
        scrollDelay: 500,
        finalWait: 1000
    },

    // URLs
    urls: {
        login: 'https://www.stremio.com/login',
        settings: 'https://www.stremio.com/acc-settings'
    },

    // Selectors
    selectors: {
        email: '#email',
        password: '#password',
        signInButton: '#sign-in-button',
        importButton: 'button.integrations-button.trakt-sync-button[style*="inline-block"]'
    }
};
