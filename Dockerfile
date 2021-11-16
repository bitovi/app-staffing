
FROM node:14 AS builder

WORKDIR /usr/src/app

RUN NODE_ENV="production"

COPY . .
RUN npm ci
RUN npm run build
RUN npm run storybook:build


FROM nginx:alpine AS server

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]