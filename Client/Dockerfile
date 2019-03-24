FROM node:alpine as build-stage

WORKDIR /Client

COPY . .

RUN npm install -g @angular/cli
RUN npm install
RUN ng build --prod

FROM nginx:1.14.2-alpine


WORKDIR /Client
COPY --from=build-stage /Client/dist/Client .
# COPY nginx.conf .

COPY --from=build-stage /Client/dist/Client /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
# RUN nginx -s reload
# RUN /etc/init.d/nginx reload

EXPOSE 80
