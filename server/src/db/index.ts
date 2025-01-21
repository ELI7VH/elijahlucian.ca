import Mongoose from 'mongoose'
import * as models from './models'

export const connectDb = async () => {
  const uri =
    process.env.DB_URI ||
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

  console.log('connecting to db...', uri)
  if (!uri) {
    throw new Error('DB_URI is not set')
  }
  const mongoose = await Mongoose.connect(uri)

  console.log('connected to db!')

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err)
  })

  mongoose.connection.on('open', () => {
    console.log('MongoDB connection open!')
  })

  mongoose.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    },
  })

  // allow any input to be passed to the database

  mongoose.set('strictQuery', false)

  return { mongoose, models }
}
