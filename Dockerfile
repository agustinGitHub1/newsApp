FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

RUN npm install

COPY src ./src

RUN npm run build -- --configuration production

FROM nginx:alpine

COPY --from=build /app/dist/news-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
