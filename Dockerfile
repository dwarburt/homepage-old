FROM node:12.16.1 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN $(npm bin)/ng build --prod --build-optimizer

FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/homepage/ /usr/share/nginx/html/
