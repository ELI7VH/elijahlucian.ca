import mongoose, { Schema } from 'mongoose'

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
      pinned: { type: [Schema.Types.ObjectId], ref: 'Metadata', default: [] },
      starred: { type: [Schema.Types.ObjectId], ref: 'Metadata', default: [] },
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
