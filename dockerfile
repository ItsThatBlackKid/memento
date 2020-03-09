FROM node:12.16.1-alpine

RUN mkdir -p /srv/memento/api && chown -R node:node /srv/memento/

WORKDIR /srv/memento/api

COPY package*.json ./
USER root

RUN npm ci --only=production
RUN npm i -g npm-install-changed
RUN npm install-changed

COPY . .


RUN npm run build

COPY --chown=root:root . .


EXPOSE 8000

CMD npm run start-build