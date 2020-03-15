FROM node:12.16.1-alpine

RUN mkdir -p /srv/memento/api && chown -R node:node /srv/memento/

WORKDIR /srv/memento/api

COPY package*.json ./
USER root

RUN npm i

COPY --chown=root:root . .

EXPOSE 8000

CMD npm run start