import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const app = express()
const PORT = process.env.PORT

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`)
})
