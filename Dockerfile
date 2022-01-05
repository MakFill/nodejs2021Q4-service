FROM node:16.13-alpine as src

WORKDIR /app

COPY package*.json .

COPY . .


FROM node:16.13-alpine as dependencies

WORKDIR /app

COPY package*.json .

RUN npm install --production && npm install typescript nodemon @types/node @types/uuid


FROM node:16.13-alpine

WORKDIR /app

COPY --from=dependencies app/node_modules ./node_modules/

COPY --from=src app/ .

ARG PORT

EXPOSE $PORT

VOLUME [ "/app/logs" ]

CMD ["npm", "run", "dev"]