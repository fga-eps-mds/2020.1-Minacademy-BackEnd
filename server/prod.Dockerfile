FROM node:12.18.3

WORKDIR /node-app

COPY ./package.json .
RUN npm install --production
COPY . .

USER 1001

CMD node index.js