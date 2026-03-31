FROM node:latest
LABEL authors="Ivan"

RUN mkdir /app
WORKDIR /app

COPY ./backend/. ./
RUN npm i

