# Marvel Character finder


## SETUP

### Set the enviroment variables inside backend project
Copy the .env.example file to .env

`cp ./backend/.env.example ./backend/.env`

Fill the copied file with MARVEL Keys (public and private).

`MARVEL_API_PUBLIC_KEY=`
`MARVEL_API_PRIVATE_KEY=`

Use docker-compose to run both database and the API

`docker-compose up --build`

To install docker-compose, check this article [installing docker-compose Linux](https://linuxize.com/post/how-to-install-and-use-docker-compose-on-ubuntu-18-04/)

### Run script to download all data from Marvel API and 

To populate database with more than 1400 Marvel characters, run the script bellow:
`npm run seed` or `yarn seed`

It refers to the script in `backend/src/app/scripts/marvel-api-seed.js`.


### Create database schemas

`sequelize db:create`
`sequelize db:migrate`


Optionally, populate with dummy data:
`sequelize db:seed:all`

