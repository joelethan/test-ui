FROM node:14.21-alpine3.16 as build

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY .  .
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
