FROM node:12.13.0

RUN mkdir -p /opt/marvel-backend

WORKDIR /opt/marvel-backend

COPY package.json ./

RUN npm install

COPY . . 

EXPOSE 8600

CMD ["npx", "sequelize", "db:create"]

CMD ["npx", "sequelize", "db:migrate"]

CMD ["npm", "run", "seed"]

CMD ["npm", "start"]

