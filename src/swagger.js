const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'src/swagger.json'
const endpointsFiles = ['src/app.ts']

const doc = {
  info: {
    title: 'SOCRA Parcours',
    description: 'Project for SOCRA',
  },
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

swaggerAutogen(outputFile, endpointsFiles, doc)