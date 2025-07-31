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

## Quick Start

1. **Clone this repository:**
```bash
git clone https://github.com/Shaun2177/stremio-import.git
cd stremio-import
```

2. **Install dependencies and Chromium:**
```bash
bun install
sudo apt install chromium-browser
```

3. **Create your `.env` file:**
```bash
cp .env.example .env
# Then edit .env with your credentials:
EMAIL=your_email@example.com
PASSWORD=your_stremio_password
SCHEDULE_SECONDS=7200
```

4. **Start the automation:**
```bash
bun start
```

**Note for ARM64 users (Apple Silicon, ARM servers):** If you get an `ENOEXEC` error, see the [ARM64 Support](#arm64-support-apple-silicon-arm-servers) section below.

The script will now run continuously in the background, automatically clicking the Stremio import button every 2 hours.

## Running as a System Service (systemd)

For production servers, you can run the script as a systemd service to ensure it starts automatically and runs continuously:

1. **Copy the service file:**
```bash
sudo cp stremio-import.service /etc/systemd/system/
```

2. **Edit the service file paths (if needed):**
```bash
sudo nano /etc/systemd/system/stremio-import.service
```
Update the `User`, `WorkingDirectory`, and `EnvironmentFile` paths to match your setup.

3. **Enable and start the service:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable stremio-import.service
sudo systemctl start stremio-import.service
```

4. **Check service status:**
```bash
sudo systemctl status stremio-import.service
```

5. **View logs:**
```bash
sudo journalctl -u stremio-import.service -f
```

The service will automatically restart if it crashes and will start on system boot.

## Configuration

### Scheduling Options
Control how often the import button is clicked by setting `SCHEDULE_SECONDS` in your `.env` file:

```bash
SCHEDULE_SECONDS=1800    # Click import button every 30 minutes
SCHEDULE_SECONDS=3600    # Click import button every 1 hour  
SCHEDULE_SECONDS=7200    # Click import button every 2 hours (default)
SCHEDULE_SECONDS=21600   # Click import button every 6 hours
```

The script runs continuously and will automatically perform the import operation at your specified interval.

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

## Alternative Runtimes

### Using npm instead of bun
If you prefer npm (script still runs continuously):
```bash
npm install
npm start
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
- **Script won't start**: Make sure you have Bun installed and run `bun install` first
- **ARM64/Apple Silicon Issues**: See ARM64 setup below

### ARM64 Support (Apple Silicon, ARM servers)

If you're getting `ENOEXEC` errors on ARM64 systems, install Chromium manually:

**Ubuntu/Debian ARM64:**
```bash
# Install Chromium for ARM64 (recommended)
sudo apt update
sudo apt install chromium-browser

# Set environment variable to use system Chromium
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Then run the script
bun start
```

**macOS Apple Silicon:**
```bash
# Install Chrome via Homebrew
brew install --cask google-chrome

# Set environment variable
export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Then run the script
bun start
```

**Alternatively, add to your `.env` file:**
```bash
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

## Requirements

- **Bun Runtime**: Fast JavaScript runtime and package manager
- **Chromium Browser**: Install with `sudo apt install chromium-browser`
- **Stremio Account**: You need a valid Stremio account
- **Trakt Integration**: Enable Trakt in your Stremio account settings before running this script

## Disclaimer

This script is for educational and personal use only. Please respect Stremio's terms of service and use responsibly. The authors are not responsible for any misuse of this tool.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Shaun2177/stremio-import/issues) on GitHub.
