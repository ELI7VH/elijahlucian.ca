import { connectDb } from './db'
import repl from 'repl'
import { s3 } from './services/s3'

export const it = async () => {
  const { mongoose, models } = await connectDb()

  const replServer = repl.start({
    prompt: 'eli7vh> ',
    useColors: true,
    useGlobal: true,
  })

  replServer.context.s3 = s3()
  replServer.context.db = mongoose
  replServer.context.models = models
}

it()
