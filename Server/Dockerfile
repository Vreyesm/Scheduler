FROM node:alpine


WORKDIR /Server

COPY . .

EXPOSE 3000

RUN npm install

ENTRYPOINT ["npm", "run",  "start:prod"]