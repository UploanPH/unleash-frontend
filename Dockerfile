FROM node:12.18.3-alpine as builder

RUN mkdir /app
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build

FROM nginx:1.15-alpine

RUN apk add --no-cache --update bash curl && \
    rm -rf /var/cache/apk/*

ARG app_name=unleash-frontend
ARG build_version="1.0.2-edge"

EXPOSE 80
COPY  --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf