FROM node:13.12.0-alpine as build
WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html
COPY --from=build /app/public/images /usr/share/nginx/html/images
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


