FROM node:20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS="--max_old_space_size=4096"
RUN corepack enable

WORKDIR /app
COPY . .

# Build Stage
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Prisma
WORKDIR /app/server
RUN pnpm prisma migrate deploy


WORKDIR /app
RUN pnpm run build
RUN pnpm --filter server --prod deploy /prod/server

# Client Stage
FROM nginx:1.26-alpine AS nginx
COPY --from=build /app/client/dist /usr/share/nginx/html

# Server Stage
FROM node:20-alpine AS server
COPY --from=build /prod/server /prod/server



WORKDIR /prod/server

ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]