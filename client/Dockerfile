FROM node:14-alpine
WORKDIR /client

COPY /package.json package.json

RUN npm install

COPY . /client

EXPOSE 3000

CMD [ "npm", "start" ]
