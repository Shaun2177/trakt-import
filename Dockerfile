# Use Debian slim as base for ARM compatibility
FROM debian:bookworm-slim

# Install minimal packages for Puppeteer and Bun
RUN apt-get update && apt-get install -y \
    curl \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN bun install --production

# Copy application code
COPY index.js ./

# Run the application
CMD ["bun", "run", "index.js"]
