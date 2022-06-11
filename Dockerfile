FROM node:16

WORKDIR /src
COPY package*.json ./

RUN npm ci
COPY . .

CMD npm run start

EXPOSE 8080