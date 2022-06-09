import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import { parcoursController } from './controller'


const app = express()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/', parcoursController)

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

export default app
