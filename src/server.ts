import app from './app'
import { AppDataSource } from "./data-source"

const PORT = process.env.PORT

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Express is listening at http://localhost:${PORT}`)
    console.log(`Documentation available at http://localhost:${PORT}/doc`)
  })
}).catch(error => {
  console.error(`Error during databse intialization: ${error}`)
})
