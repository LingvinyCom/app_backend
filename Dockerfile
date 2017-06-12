FROM node:latest

RUN npm i -g typescript ts-node

WORKDIR /var/www/lingviny-api

ADD . /var/www/lingviny-api

RUN npm install

EXPOSE 3000

CMD ["docker/start.sh"]

