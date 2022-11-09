FROM node:alpine

WORKDIR /usr/api

COPY package*.json ./

RUN yarn

COPY . .

CMD yarn start