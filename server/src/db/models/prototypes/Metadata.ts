import mongoose from 'mongoose'

export const Metadata = mongoose.model(
  'Metadata',
  new mongoose.Schema(
    {
      name: String,
      metadata: { type: Object, default: {} },
      // this will always represent a "larger collection", like a tree node.
      parent: String,
      // scoping queries
      type: { type: String, required: true },
      scope: String,
      // lookup helpers
      tags: { type: [String], default: [] },
      // regular shit
      createdBy: String,
      public: { type: Boolean, default: false },
      deleted: { type: Boolean },
      // idk why i added these
      verified: { type: Boolean },
      model: String,
      // possibly remove - could be useful
      foreignId: String,
    },
    {
      timestamps: true,
      strict: false,
      statics: {
        isPublic: () => true,
        path: '/prototypes/metadata',
        routes: [],
      },
    },
  ),
)
