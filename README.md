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
- A Stremio account with Trakt integration enabled

## Quick Start

1. **Clone this repository:**
```bash
git clone https://github.com/Shaun2177/stremio-import.git
cd stremio-import
```

2. **Install dependencies:**
```bash
bun install
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

The script will now run continuously in the background, automatically clicking the Stremio import button every 2 hours.

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

## Requirements

- **Bun Runtime**: Fast JavaScript runtime and package manager
- **Stremio Account**: You need a valid Stremio account
- **Trakt Integration**: Enable Trakt in your Stremio account settings before running this script

## Running as a Service

### Linux/macOS (systemd)
Create a systemd service file to run automatically:

```bash
# Create service file
sudo nano /etc/systemd/system/stremio-import.service
```

Add this content:
```ini
[Unit]
Description=Stremio Import Automation
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/stremio-import
ExecStart=/usr/local/bin/bun start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable stremio-import
sudo systemctl start stremio-import
```

### Windows
Use Task Scheduler or run in a persistent terminal window.

## Disclaimer

This script is for educational and personal use only. Please respect Stremio's terms of service and use responsibly. The authors are not responsible for any misuse of this tool.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Shaun2177/stremio-import/issues) on GitHub.
