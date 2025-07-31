# Use the official Node.js runtime as base image
FROM node:18-slim

# Install dependencies needed for Puppeteer and Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install Google Chrome Stable
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install app dependencies
RUN npm ci --only=production && npm cache clean --force

# Create a non-privileged user to run the app
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --gid 1001 nodejs

# Copy app source code
COPY --chown=nodejs:nodejs . .

# Switch to non-privileged user
USER nodejs

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Default command
CMD ["node", "index.js"]
