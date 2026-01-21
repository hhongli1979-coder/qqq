# Dockerfile for Runpod Serverless deployment
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with Python for Runpod handler
FROM python:3.11-alpine

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    curl \
    bash

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Copy Python handler and requirements
COPY handler.py .
COPY requirements.txt .

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Set environment variables
ENV HTTP_PORT=8000
ENV NODE_ENV=production

# Start the handler
CMD ["python3", "handler.py"]
