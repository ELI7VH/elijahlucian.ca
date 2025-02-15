import cors from 'cors'
import express from 'express'
import { connectDb } from './db'
import routes from './routes'

const main = async () => {
  const app = express()
  const { mongoose: db, models } = await connectDb()

  db.set('strictPopulate', false)

  app.locals.db = db
  app.locals.models = models
  app.use(express.json())
  app.use(cors())

  app.use((req, res, next) => {
    console.log(
      req.headers.host,
      req.method,
      req.url,
      req.headers.authorization,
    )
    next()
  })

  // Error handling middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack)
    if (err instanceof Error) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(500).send({ error: 'Something went wrong!' })
    }
  })

  app.get('/', async (req, res) => {
    res.send({
      message: 'Server is running!',
    })
  })

  app.use(routes())

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}

main()
