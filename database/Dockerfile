FROM postgres:14.1-alpine3.15

WORKDIR /database-pg

RUN apk update && apk upgrade

ARG PORT

EXPOSE $PORT

VOLUME [ "/database-pg/db" ]