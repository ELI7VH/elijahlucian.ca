import mongoose from 'mongoose'

export const Song = mongoose.model(
  'Song',
  new mongoose.Schema({
    artistId: String,
    name: String,
    path: String,
    folder: String,
    metadata: {},
  }),
)
