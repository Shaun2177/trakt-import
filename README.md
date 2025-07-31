# Stremio Import Automation

A fast and reliable automation script that logs into Stremio and triggers the Trakt import functionality by resetting the import timestamp.

## Features

- 🚀 **Fast execution** - Optimized for speed with minimal wait times
- 🎯 **Reliable clicking** - Smart scrolling and fallback mechanisms ensure buttons are properly clicked
- ⏱️ **Performance tracking** - Built-in timing to monitor script execution speed
- 🔒 **Secure** - Uses environment variables for sensitive credentials
- 🤖 **Headless support** - Can run with or without browser UI

## Prerequisites

- Node.js (v14 or higher)
- Bun runtime (recommended) or npm
- A Stremio account
- A Trakt account

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/stremio-import.git
cd stremio-import
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Create a `.env` file in the root directory:
```bash
PASSWORD=your_stremio_password
EMAIL=your_stremio_email
```

4. Update the `USERNAME` in `index.js` with your email address.

## Usage

Run the script:
```bash
bun index.js
# or
npm start
```

The script will:
1. Log into your Stremio account
2. Navigate to account settings
3. Click the Trakt import button
4. Reset the `lastTraktImport` localStorage value to force a new import
5. Display the total execution time

## Configuration

### Running in headless mode
Change `headless: false` to `headless: true` in `index.js` for faster execution without browser UI.

### Adjusting timeouts
You can modify the timeout values in the script:
- Page load timeout: `waitUntil: 'domcontentloaded'`
- Navigation timeout: `timeout: 5000`
- Scroll delays: `setTimeout(resolve, 500)`

## How it works

1. **Login Process**: Automatically fills in credentials and handles the login flow
2. **Smart Navigation**: Uses optimized page load strategies for faster execution
3. **Reliable Clicking**: Scrolls elements into view and uses fallback click methods
4. **localStorage Manipulation**: Resets the Trakt import timestamp to trigger a fresh import

## Troubleshooting

### Common Issues

- **"Navigation error or SPA detected"**: This is normal for single-page applications. The script continues automatically.
- **"Import button not found"**: Make sure you have Trakt integration enabled in your Stremio account.
- **Login fails**: Check your credentials in the `.env` file and `index.js`.

## Disclaimer

This script is for educational and personal use only. Please respect Stremio's terms of service and use responsibly. The authors are not responsible for any misuse of this tool.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Shaun2177/stremio-import/issues) on GitHub.
