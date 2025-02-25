import mongoose from 'mongoose'

export const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      cookie: String,
      admin: { type: Boolean, default: false },
      visits: { type: Number, default: 0 },
      accessLevel: { type: String, enum: ['user', 'admin'], default: 'user' },
      roles: { type: [String], default: [] },
      metadata: { type: Object, default: {} },
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
