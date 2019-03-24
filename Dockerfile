FROM node:alpine

RUN apk update
RUN apk add nginx

WORKDIR /Scheduler
COPY Server/dist ./Server
COPY Client/dist/Client ./Client


EXPOSE 3000
EXPOSE 4200