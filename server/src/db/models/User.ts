import mongoose from 'mongoose'

export const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      cookie: String,
      visits: { type: Number, default: 0 },
      accessLevel: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    {
      timestamps: true,
      strict: false,
      statics: {
        path: '/users',
        routes: [],
      },
    },
  ),
)
