import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
const app = express()
const port = 3000

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
