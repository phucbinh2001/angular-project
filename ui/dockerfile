FROM node:16-alpine3.11 AS build
ARG ENV
# ENV BUILD= 

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN yarn build --configuration $ENV --buildOptimizer=true --base-href '/user/'

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/user-dashboard /usr/share/nginx/html/user