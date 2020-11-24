FROM node:12.18.3

WORKDIR /node-app

COPY ./package.json .
RUN npm install --production
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

USER 1001

CMD /wait && node index.js