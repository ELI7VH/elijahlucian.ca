import { connectDb } from './db'
import repl from 'repl'

export const it = async () => {
  const { mongoose, models } = await connectDb()

  const replServer = repl.start({
    prompt: 'eli7vh> ',
    useColors: true,
    useGlobal: true,
  })

  replServer.context.db = mongoose
  replServer.context.models = models
}

it()
