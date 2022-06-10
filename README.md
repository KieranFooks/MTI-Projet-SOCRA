# MTI-Projet-SOCRA

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
'PORT=5000\nPORTDB=27017' > .env
```
Creates a .env file the API port and the database port (default port is 27017).

**1. Start database:**
```
sudo docker-compose up -d
```
This will start a detached docker container for databases.

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
