import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import { AppDataSource } from "./data-source"
import { Parcours } from "./entity/Parcours"


const app = express()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.get('/mongo', async (_req, res) => {
  const parcours = await AppDataSource.manager.find(Parcours)
  res.send(parcours)
})

export default app
