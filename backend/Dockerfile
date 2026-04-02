FROM node:latest
LABEL authors="Ivan"

RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .

