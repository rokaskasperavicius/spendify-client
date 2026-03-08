# Inspired from: https://rob.cogit8.org/posts/dokku-monorepo/
FROM node:20.20.1-alpine AS base

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Serve with nginx
FROM nginx:alpine
# Copy custom Nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets from the builder stage
COPY --from=builder --chown=node:node /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]