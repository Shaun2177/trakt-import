# Stremio Import Automation

A fast and reliable automation script that logs into Stremio and triggers the Trakt import functionality by resetting the import timestamp.

## Features

- 🚀 **Fast execution** - Optimized for speed with minimal wait times
- 🎯 **Reliable clicking** - Smart scrolling and fallback mechanisms ensure buttons are properly clicked
- ⏱️ **Performance tracking** - Built-in timing to monitor script execution speed
- 🔒 **Secure** - Uses environment variables for sensitive credentials
- 🐳 **Docker ready** - Easy deployment with Docker and Docker Compose

## Prerequisites

- Docker and Docker Compose
- A Stremio account with Trakt integration enabled

## Quick Start (Recommended)

1. **Clone this repository:**
```bash
git clone https://github.com/Shaun2177/stremio-import.git
cd stremio-import
```

2. **Edit your a `.env.example` file:**
```bash
mv .env.example .env
# Then edit .env with your credentials:
EMAIL=your_email@example.com
PASSWORD=your_stremio_password
SCHEDULE_SECONDS=7200
```

3. **Start the automation:**
```bash
docker compose up -d
```

4. **View logs:**
```bash
docker logs -f stremio-import
```

5. **Stop when needed:**
```bash
docker stop stremio-import
```

That's it! The script will now run every 2 hours automatically.

## Configuration

### Scheduling Options
Control how often the script runs by setting `SCHEDULE_SECONDS` in your `.env` file:

```bash
SCHEDULE_SECONDS=1800    # 30 minutes
SCHEDULE_SECONDS=3600    # 1 hour  
SCHEDULE_SECONDS=7200    # 2 hours (default)
SCHEDULE_SECONDS=21600   # 6 hours
```

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
```

## Advanced Usage

### Manual Docker Commands
If you prefer not to use Docker Compose:

```bash
# Build the image
docker build -t stremio-import .

# Run the container
docker run -d \
  --name stremio-import \
  --restart unless-stopped \
  -e EMAIL=your_email@example.com \
  -e PASSWORD=your_password \
  -e SCHEDULE_SECONDS=7200 \
  stremio-import

# View logs
docker logs -f stremio-import

# Stop and remove
docker stop stremio-import && docker rm stremio-import
```

### Local Development (Advanced)
If you want to run without Docker:

**Prerequisites:** Node.js (v14+), npm/bun

```bash
# Install dependencies
npm install

# Run locally
npm start
```

## How it Works

The script automatically:
1. **Logs into your Stremio account** using your credentials
2. **Navigates to account settings** 
3. **Clicks the Trakt import button** to trigger synchronization
4. **Resets the import timestamp** in localStorage to force a fresh import
5. **Schedules the next run** based on your configuration

## Troubleshooting

### Common Issues

- **"Import button not found"**: Make sure you have Trakt integration enabled in your Stremio account settings
- **"SPA navigation detected"**: This is normal behavior - the script continues automatically
- **Container won't start**: Check your `.env` file has correct EMAIL and PASSWORD values
- **Login fails**: Verify your Stremio credentials are correct

### Useful Commands

```bash
# Check if container is running
docker ps

# View container logs
docker logs -f stremio-import
```

## Requirements

- **Stremio Account**: You need a valid Stremio account
- **Trakt Integration**: Enable Trakt in your Stremio account settings before running this script
- **Docker**: Required for the easiest setup experience

## Disclaimer

This script is for educational and personal use only. Please respect Stremio's terms of service and use responsibly. The authors are not responsible for any misuse of this tool.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Shaun2177/stremio-import/issues) on GitHub.
