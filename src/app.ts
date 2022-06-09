import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const app = express()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

export default app
