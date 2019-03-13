FROM justsml/docker-phantom-node

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 80

CMD ["npm", "start"]