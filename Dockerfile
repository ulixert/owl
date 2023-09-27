FROM node:18-slim AS base
ENV PNPM_HOME="/usr/local/pnpm-global"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

# Copy files and set ownership to node user
COPY --chown=node:node . .

FROM base AS prod-deps
RUN --mount=type=catch, id=pnpm, target=/pnpm/store pnpm install --frozen-lockfile --prod

FROM base AS build
RUN --mount=type=catch, id=pnpm, target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

RUN pnpm install --frozen-lockfile
RUN pnpm run build

RUN chown -R node:node /usr/src/app/client/node_modules

USER node
CMD pnpm dev
