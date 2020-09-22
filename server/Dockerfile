FROM node:12.18.3

WORKDIR /node-app

RUN npm install nodemon -g --quiet

COPY ./package.json .
RUN npm install --quiet --no-optional
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && nodemon -L --watch . index.js
