# Build stage
FROM node:24-alpine3.21 AS builder

WORKDIR /app
 
RUN corepack enable

COPY backend/package.json yarn.lock ./
RUN yarn install
 
COPY . .
RUN yarn backend/build

# Production stage
FROM node:24-alpine3.21 AS production

WORKDIR /app
 
RUN corepack enable

COPY backend/package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/materials ./materials

EXPOSE 3000

CMD ["node", "dist/main"]