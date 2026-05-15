# Build stage
FROM node:24-alpine3.21 AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN corepack enable && yarn install --immutable

COPY backend/ ./backend
COPY materials/ ./materials
RUN yarn backend/build

# Production stage
FROM node:24-alpine3.21 AS production

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN corepack enable && yarn workspaces focus @roberto-de-abreu-salgado-desafio-full-stack/backend --production

COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/materials ./materials

EXPOSE 3000

CMD ["node", "dist/main"]