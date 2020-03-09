FROM node:12.16.1-alpine



WORKDIR /srv/memento/api

COPY package*.json ./
USER root

ADD package*.json /tmp/package.json
RUN cd /tmp && npm ci -only=production
RUN mkdir - p /srv/memento/api && cp -a /tmp/node_modules /srv/memento/api

COPY . .


RUN npm run build

COPY --chown=root:root . .


EXPOSE 8000

CMD npm run start-build