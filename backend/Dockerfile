# Stage 1: Build environment
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies for tsc)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Production environment
FROM node:20-alpine AS runner

WORKDIR /app

# Set node env to production
ENV NODE_ENV="production"

# Copy package manifests and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy generated Prisma Client from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy compiled javascript from builder
COPY --from=builder /app/dist ./dist

# Expose backend port
EXPOSE 4000

# The startup command chains the migration deployment and the app start.
# This ensures the DB schema is up to date before accepting requests.
CMD npx prisma migrate deploy && npm run start
