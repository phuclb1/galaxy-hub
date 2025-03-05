FROM node:20.18-alpine3.21 AS build

ARG VITE_VERSION
ARG VITE_BACKEND_URL
ARG VITE_MS_CLIENT_ID
ARG VITE_MS_TENANT_ID

COPY web /app/web

ENV VITE_VERSION=$VITE_VERSION
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_MS_CLIENT_ID=$VITE_MS_CLIENT_ID
ENV VITE_MS_TENANT_ID=$VITE_MS_TENANT_ID

WORKDIR /app/web
RUN yarn install
RUN yarn build

FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/web/dist .
COPY ./build/nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]