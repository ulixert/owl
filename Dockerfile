FROM node:18 AS base
ENV PNPM_HOME="/usr/local/pnpm-global"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy files and set ownership to node user
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS validation
COPY --from=prod-deps /app/packages/validation/node_modules/ /app/packages/validation/node_modules
COPY --from=build /app/packages/validation/dist /app/packages/validation/dist

FROM validation AS server
COPY --from=prod-deps /app/server/node_modules/ /app/server/node_modules
COPY --from=build /app/server/dist /app/server/dist
WORKDIR /app/server
EXPOSE 8000
CMD ["pnpm", "run", "start"]

FROM nginx:1.24-alpine AS nginx
COPY --from=build /app/client/dist /usr/share/nginx/html
