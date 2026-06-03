# Build stage
FROM node:24-alpine3.21 AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json
RUN corepack enable && yarn install --immutable

COPY packages/backend/ ./packages/backend
COPY materials/ ./materials
RUN yarn build:backend

# Production stage
FROM node:24-alpine3.21 AS production

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json
RUN corepack enable && yarn workspaces focus @notes-app/backend --production

COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/materials ./materials
COPY packages/backend/scripts/entrypoint.sh ./scripts/entrypoint.sh
RUN chmod +x scripts/entrypoint.sh

EXPOSE 3000

CMD ["./scripts/entrypoint.sh"]