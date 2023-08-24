# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.4.2
FROM node:${NODE_VERSION}-slim as build

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV="production"

COPY . .

RUN yarn install
RUN npx tsc -p ./tsconfig.json

WORKDIR /usr/src/app/client

RUN yarn --production=true
RUN npx craco build

FROM node:${NODE_VERSION}-slim as base-run
WORKDIR /usr/src/app

COPY package.json .
RUN yarn --production=true

COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/client/build/ /usr/src/app/client/build/

EXPOSE 3000

CMD ["yarn", "run", "serve"]

# # Throw-away build stage to reduce size of final image
# FROM base as build
#
# # Install packages needed to build node modules
# RUN apt-get update -qq && \
#     apt-get install -y build-essential pkg-config python
#
# # Install node modules
# COPY package.json yarn.lock ./
# # RUN yarn install --frozen-lockfile --production=false
#
# # Copy application code
# COPY . .
#
# RUN cd client
#
# RUN yarn --production=true
#
# # Build client
# RUN yarn build
#
# RUN cd ..
#
# # Remove development dependencies
# RUN yarn install --production=true
#
# RUN yarn build:server
#
#
# # Final stage for app image
# FROM base
#
# # Copy built application
# COPY --from=build /app /app
#
# # Start the server by default, this can be overwritten at runtime
# EXPOSE 3000
# CMD [ "yarn", "run", "start" ]
