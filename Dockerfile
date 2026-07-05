ARG NODE_VERSION=24-alpine
ARG APP_NAME=oneview
ARG APP_DIR=apps/oneView

FROM node:${NODE_VERSION} AS deps
WORKDIR /repo

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml lerna.json ./
COPY apps/oneView/package.json apps/oneView/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json

RUN pnpm install --frozen-lockfile

FROM deps AS build
ARG APP_NAME
COPY apps ./apps
COPY packages ./packages
RUN pnpm --filter ${APP_NAME} build

FROM nginx:1.27-alpine AS runner
ARG APP_DIR
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/${APP_DIR}/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
