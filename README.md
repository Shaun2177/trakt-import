# Stremio Import Automation

A fast and reliable automation script that logs into Stremio and triggers the Trakt import functionality by resetting the import timestamp.

## Features

- 🚀 **Fast execution** - Optimized for speed with minimal wait times
- 🎯 **Reliable clicking** - Smart scrolling and fallback mechanisms ensure buttons are properly clicked
- ⏱️ **Performance tracking** - Built-in timing to monitor script execution speed
- 🔒 **Secure** - Uses environment variables for sensitive credentials
- ⚡ **Bun powered** - Uses Bun runtime for lightning-fast performance

## Prerequisites

- Bun runtime (install from [bun.sh](https://bun.sh))
- Chromium browser: `sudo apt install chromium-browser`
- A Stremio account with Trakt integration enabled

### Sample Output
```
🚀 Stremio Import Scheduler
ℹ Scheduled to run every 2 hours
ℹ Next run: 1/31/2025, 12:30:15 PM

🎬 Stremio Import Automation
✓ Logged in
✓ Import button clicked
✓ Import timestamp reset
✓ Completed in 8.4s
────────────────────────────────────────────────────────

ℹ Next run: 1/31/2025, 2:30:15 PM
[Script continues running in background...]
```

## How it Works

The script runs continuously in the background and automatically:
1. **Logs into your Stremio account** using your credentials
2. **Navigates to account settings** 
3. **Clicks the Trakt import button** to trigger synchronization
4. **Resets the import timestamp** in localStorage to force a fresh import
5. **Waits for the specified interval** then repeats the process

The script will keep running until you stop it manually.

## Troubleshooting

### Common Issues

- **"Import button not found"**: Make sure you have Trakt integration enabled in your Stremio account settings
- **"SPA navigation detected"**: This is normal behavior - the script continues automatically
- **"Please set EMAIL and PASSWORD"**: Check your `.env` file has correct EMAIL and PASSWORD values
- **Login fails**: Verify your Stremio credentials are correct

## Requirements

- **Bun Runtime**: Fast JavaScript runtime and package manager
- **Chromium Browser**: Install with `sudo apt install chromium-browser`
- **Stremio Account**: You need a valid Stremio account
- **Trakt Integration**: Enable Trakt in your Stremio account settings before running this script

## Disclaimer

This script is for educational and personal use only. Please respect Stremio's terms of service and use responsibly. The authors are not responsible for any misuse of this tool.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Shaun2177/stremio-import/issues) on GitHub.
