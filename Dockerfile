
FROM node:14 AS builder

# Create app directory
WORKDIR /usr/src/app


COPY . .
RUN NODE_ENV="production"
RUN npm ci
RUN npm run build
RUN npm run storybook:build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf


# expose your ports
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]





