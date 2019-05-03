FROM node:9.11

COPY . /app

COPY ./phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin

WORKDIR /app

EXPOSE 80

RUN npm install

CMD ["npm", "start"]