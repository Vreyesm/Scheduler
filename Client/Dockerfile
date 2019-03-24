FROM nginx:1.14.2-alpine


WORKDIR /Client
COPY ./dist/Client .
COPY nginx.conf .

COPY /dist/Client /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
# RUN nginx -s reload
# RUN /etc/init.d/nginx reload

EXPOSE 80
