#FROM node:20-slim AS base
#ENV PNPM_HOME="/pnpm"
#ENV PATH="$PNPM_HOME:$PATH"
#ENV NODE_OPTIONS="--max_old_space_size=4096"
#RUN corepack enable
#
#WORKDIR /app
#
## Copy files and set ownership to node user
#COPY . .
#
#FROM base AS prod-deps
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
#
#FROM base AS build
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
#RUN pnpm run build
#
#FROM base AS validation
#COPY --from=prod-deps /app/packages/validation/node_modules/ /app/packages/validation/node_modules
#COPY --from=build /app/packages/validation/dist /app/packages/validation/dist
#
#FROM validation AS server
#COPY --from=prod-deps /app/server/node_modules/ /app/server/node_modules
#COPY --from=build /app/server/dist /app/server/dist
#WORKDIR /app/server
#EXPOSE 3000
#CMD ["pnpm", "run", "start"]
#
#FROM nginx:1.24-alpine AS nginx
#COPY --from=build /app/client/dist /usr/share/nginx/html
#

#FROM node:20-slim AS base
#ENV PNPM_HOME="/pnpm"
#ENV PATH="$PNPM_HOME:$PATH"
#ENV NODE_OPTIONS="--max_old_space_size=4096"
#RUN corepack enable
#
#WORKDIR /app
#COPY . .
#
## Build Stage
#FROM base AS build
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
#RUN pnpm run build
#RUN pnpm --filter client --prod deploy /prod/client
#RUN pnpm --filter server --prod deploy /prod/server
#
## Client Stage
#FROM nginx:1.26-alpine AS nginx
#COPY --from=build /prod/client/dist /usr/share/nginx/html
#
## Server Stage
#FROM base AS server
#COPY --from=build /prod/server /prod/server
#WORKDIR /prod/server
#EXPOSE 3000
#CMD ["pnpm", "start"]
