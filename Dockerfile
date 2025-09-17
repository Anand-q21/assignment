FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npx nx build api-gateway
RUN npx nx build products-service  
RUN npx nx build orders-service

# Expose ports
EXPOSE 3000 3001 3002

# Default command (override in docker-compose)
CMD ["npx", "nx", "serve", "api-gateway"]