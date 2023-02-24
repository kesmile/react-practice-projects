# ---------- Base ----------
FROM node:14-slim AS base
RUN apt-get update && apt-get install -y libpq-dev g++ make git openssh-client curl
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder
WORKDIR /app

COPY .npmrc package.json pnpm-lock.yaml babel.config.json ./
RUN pnpm install
COPY ./src ./src
RUN pnpm build

# Remove dev dependencies
RUN pnpm prune --prod

# ---------- Release ----------
FROM parseplatform/parse-server:5.4.1 AS release
COPY --from=builder /app/node_modules /parse-cloud/node_modules
COPY --from=builder /app/dist /parse-cloud/