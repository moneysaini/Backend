FROM node:latest

WORKDIR /usr/local/app

COPY ./ /usr/local/app

RUN npm install

EXPOSE ${PORT}

CMD ["node", "dist/index.js"]