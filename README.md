# MTI-Projet-SOCRA

## Project presentation
This project is composed of one mongo database and a Node Express API.

Both the database and the API are deployed via docker.

### Design Patern
The API is using a Controller (`./src/controller`) - Service (`./src/service`) - Repository (`./src/repository`) - Model  (`./src/entity`) architecture.

We are using a singleton to access the database (`./src/data-source.ts`).

To avoid redudant values in tests, we have grouped the values used to initialize the database.

### Used Librairies
- `swagger-autogen`: To generate the swagger of the API thanks to the comments in the code
- `typescript`: To use types in js
- `typeorm`: ORM that is used to comunicate with the database
- `jest`: The test framework
- `supertest`: To simulate requests during tests

### Tests
To test our solution, we have made some unit tests (`./src/__test__/unit`) and some integration tests (`./src/__test__/integration`).

### Routes
- GET `/parcours`: return all parcours in DESC order. This route can also be used with query strings:
  - if `campus` is set, it will return all parcours which match the given campus
  - if `type` is set, it will return all parcours which match the given type
  - if `cost` is set, it will return all parcours which cost is less than the given value
- POST `/parcours/create`: If the user is connected, add a new parcours
- PUT `/parcours/:id`: modify the description of a parcours thanks to it's id 
- POST `/parcours`: return all parcours ordered by keywords pertinence
  - body format: `{ keywords: "word1 word2 word3" }`
- POST `/auth`: get JWT token with the email and password
  - body format: `{ email: "test@gmail.com", password: "pwd"}`
  - The user in the database has an email: `test@gmail.com` and a password: `pwd`

## Main Directory
- `./github`: Files about the CI configuration
- `./src`: Files about the API
- `./src/__test__`: Files about tests of the API
- `./mongo-init`: Files about the initialization of mongodb
- `./mongodb`: Build directory of the database

## Dev env prerequisites
- Node v16 (LTS)
- npm 8
- Docker and docker-compose
- Visual Studio Code with optional (but recommended) plugin
  - ESLint

## Start dev env
**0a. Install project, if not already installed:**
```
npm ci
```
Install project.

**0b. Create a .env file, if not created yet:**
```
export PORT=8080
```
Creates a .env file the API port and the database port (default port is 27017).

**1. Start database:**
```
sudo docker-compose up -d
```
This will start a detached docker container for databases.

This container can be stopped using `sudo docker-compose down`

**2. Start server**
```
npm start
```
Starts server.

## Run tests

**1. Make sure you started databases running**

See "1. Start database:" in "Start dev env" section.

**2. Run tests**
```
npm run test
```
Run all Jest tests (unit and integration).

To run unit tests only: `npm run test:unit`

To run integration tests only: `npm run test:integration`

## Start prod env
```
docker-compose up -d web
```
Launch database and api docker containers.

To access api: http://localhost:8080

To access documentation: http://localhost:8080/doc
