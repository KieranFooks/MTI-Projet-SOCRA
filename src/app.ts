import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import { authController, parcoursController } from './controller'
import crypto from 'crypto'

process.env.SECRET = crypto.randomBytes(64).toString('hex')

const app = express()
app.use(express.json())

app.use(express.json())

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/parcours', parcoursController
  // #swagger.tags = ['Parcours']
)
app.use('/auth', authController
  // #swagger.tags = ['Auth']
)

export default app
