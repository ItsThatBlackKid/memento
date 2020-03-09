FROM node:12.16.1-alpine



WORKDIR /srv/memento/api

COPY package*.json ./
USER root

ADD package*.json /tmp/
RUN cd /tmp && npm ci -only=production
RUN cp -a /tmp/node_modules/ /srv/memento/api
WORKDIR /srv/memento/api

COPY . .
RUN ls -la

RUN npm run build

COPY --chown=root:root . .


EXPOSE 8000

CMD npm run start-build