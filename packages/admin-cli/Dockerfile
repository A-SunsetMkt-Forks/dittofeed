# Rebuild the source code only when needed
FROM node:20 AS builder

# Accept the build argument in the builder stage
ARG APP_VERSION

WORKDIR /service

RUN yarn set version 4.1.1

ENV PATH="$PATH:/root/.temporalio/bin"

COPY ./packages/admin-cli/scripts/install-deps.sh ./
COPY ./packages/admin-cli/scripts/admin.sh ./
RUN chmod +x ./install-deps.sh && \
    chmod +x ./admin.sh && \
    ./install-deps.sh

COPY *.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY ./packages/admin-cli/*.json ./packages/admin-cli/
COPY ./packages/backend-lib/*.json ./packages/backend-lib/
COPY ./packages/isomorphic-lib/*.json ./packages/isomorphic-lib/
COPY ./packages/emailo/*.json ./packages/emailo/

RUN yarn workspaces focus backend-lib admin-cli emailo

COPY ./packages/backend-lib/ ./packages/backend-lib
COPY ./packages/isomorphic-lib/ ./packages/isomorphic-lib
COPY ./packages/admin-cli/ ./packages/admin-cli
COPY ./packages/emailo/ ./packages/emailo

RUN yarn workspace emailo build && \
    yarn workspace backend-lib build && \
    yarn workspace admin-cli build

# Set the environment variable
ENV APP_VERSION=${APP_VERSION}

ENTRYPOINT ["./admin.sh"]
