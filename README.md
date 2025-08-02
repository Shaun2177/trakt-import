# 🎬 Trakt Import to Stremio Automation

Automated script that logs into Stremio and triggers Trakt import functionality by resetting the import timestamp. Runs continuously in the background on a configurable schedule.

## ✨ Features

- � **Docker-first** - One command deployment with Docker Compose
- 🚀 **Fast & Lightweight** - Minimal Docker image for quick builds
- ⏱️ **Scheduled runs** - Configurable interval (default: 2 hours)
- 🎯 **Reliable** - Smart error handling and retry mechanisms
- 📊 **Clear logging** - Beautiful colored output with timing
- 🔒 **Secure** - Environment-based credential management

## 🚀 Quick Start (Recommended: Docker Compose)

### Step 1: Clone the repository
```bash
git clone https://github.com/Shaun2177/trakt-import.git
cd trakt-import
```

### Step 2: Configure your credentials
Edit the `docker-compose.yml` file and replace the placeholder values:
```yaml
environment:
  - EMAIL=your-actual-stremio-email@example.com
  - PASSWORD=your-actual-stremio-password
  - SCHEDULE_SECONDS=7200  # Run every 2 hours
  - TZ=your_timezone (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)
```

### Step 3: Run with Docker Compose
```bash
# Build and start the container
docker compose up -d

# View logs
docker logs trakt-import

# View logs with live updates
docker logs -f trakt-import

# Stop the container
docker stop trakt-import
```

That's it! The script will now run automatically every 2 hours (or your configured interval).

## 🔧 Alternative Method (Manual Setup)

If you can't use Docker, you can run it manually with Node.js/Bun:

### Step 1: Install Prerequisites
```bash
# Install Bun (recommended - faster)
curl -fsSL https://bun.sh/install | bash

# OR install Node.js (if you prefer)
# Download from https://nodejs.org
```

### Step 2: Install Chromium
```bash
# On Ubuntu/Debian
sudo apt update
sudo apt install chromium-browser

# On macOS
brew install chromium

# On Windows
# Download from https://www.chromium.org/getting-involved/download-chromium
```

### Step 3: Clone and Setup
```bash
git clone https://github.com/Shaun2177/trakt-import.git
cd trakt-import

# Install dependencies
bun install
# OR with npm: npm install
```

### Step 4: Set Environment Variables
```bash
# On Linux/macOS
export EMAIL="your-stremio-email@example.com"
export PASSWORD="your-stremio-password"
export SCHEDULE_SECONDS=7200

# On Windows PowerShell
$env:EMAIL="your-stremio-email@example.com"
$env:PASSWORD="your-stremio-password"
$env:SCHEDULE_SECONDS=7200
```

### Step 5: Run the Script
```bash
# With Bun (recommended)
bun run index.js

# OR with Node.js
node index.js
```

## 📋 Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `EMAIL` | Your Stremio account email | **Required** |
| `PASSWORD` | Your Stremio account password | **Required** |
| `SCHEDULE_SECONDS` | Interval between runs (in seconds) | `7200` (2 hours) |
| `TZ` | Container timezone for logs and scheduling | `Europe/London` |

### Common Schedule Examples:
- `3600` = 1 hour
- `7200` = 2 hours (default)
- `21600` = 6 hours
- `86400` = 24 hours (daily)

### Common Timezone Examples:
- `Europe/London` = UK time (GMT/BST)
- `America/New_York` = US Eastern time
- `America/Los_Angeles` = US Pacific time
- `Europe/Paris` = Central European time
- `Asia/Tokyo` = Japan time
- `UTC` = Coordinated Universal Time

## 📊 Sample Output

```
────────────────────────────────────────────────────────
🚀 Trakt Import to Stremio Scheduler

ℹ  Scheduled to run every 2 hours
ℹ  First run: Starting now...
ℹ  Next run: 01/08/2025 14:30

🎬 Trakt Import to Stremio Automation
✓ Logged in
✓ Import button clicked
✓ Import timestamp reset
✓ Completed in 4.2s
────────────────────────────────────────────────────────
```

## 🔍 How It Works

1. **Logs into Stremio** using your credentials
2. **Navigates to account settings** page
3. **Finds and clicks the Trakt import button**
4. **Resets the localStorage timestamp** to force fresh import
5. **Waits for configured interval** then repeats

## 🛠️ Troubleshooting

### Docker Issues
```bash
# Check if container is running
docker ps

# View detailed logs
docker logs trakt-import

# Restart the container
docker restart trakt-import
```

### Common Problems

| Problem | Solution |
|---------|----------|
| "Import button not found" | Enable Trakt integration in Stremio settings first |
| "Login failed" | Double-check your EMAIL and PASSWORD in docker-compose.yml |
| "Container won't start" | Check Docker logs: `docker logs trakt-import` |
| "SPA navigation detected" | This is normal - script continues automatically |

### Manual Run Issues
- **Missing Chromium**: Install with `sudo apt install chromium-browser`
- **Environment variables not set**: Export them in your shell before running
- **Permission issues**: Make sure you have write access to the project directory

## 📋 Prerequisites

### For Docker Method (Recommended):
- Docker and Docker Compose installed
- Your Stremio account credentials

### For Manual Method:
- Bun runtime OR Node.js (14+)
- Chromium browser installed
- Your Stremio account credentials

## ⚠️ Important Notes

- **Enable Trakt first**: Make sure Trakt integration is enabled in your Stremio account settings
- **Respect rate limits**: Don't set SCHEDULE_SECONDS too low (minimum recommended: 1800 seconds)
- **Keep credentials secure**: Never commit your actual credentials to version control

## 📜 License & Disclaimer

This tool is for personal use only. Please respect Stremio's terms of service. The authors are not responsible for any misuse of this tool.

## 🤝 Support

Having issues? [Open an issue](https://github.com/Shaun2177/trakt-import/issues) on GitHub with:
- Your operating system
- Docker version (if using Docker)
- Error logs/screenshots
- Steps you've already tried
