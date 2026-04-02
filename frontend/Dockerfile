FROM node:alpine AS builder
LABEL authors="Ivan"

RUN mkdir /client
WORKDIR /client
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

CMD ["npm", "start"]
