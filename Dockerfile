FROM node:16.13-alpine

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install 

ARG PORT

EXPOSE $PORT

VOLUME [ "/app/logs" ]

CMD ["npm", "run", "start:dev"]