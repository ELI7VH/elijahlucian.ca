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
      items: { type: [mongoose.Schema.Types.Mixed], default: [] },
      // lookup helpers
      tags: { type: [String], default: [] },
      // regular shit
      public: { type: Boolean, default: false },
      deleted: { type: Boolean },
      // idk why i added these
      verified: { type: Boolean },
      model: String,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      // possibly remove - could be useful
      foreignId: String,
    },
    {
      timestamps: true,
      strict: false,
      // populate based on route.
      statics: {
        isPublic: () => true,
        path: '/prototypes/metadata',
        routes: [
          {
            path: '/',
            method: 'get',
            handler: async (req: any, res: any) => {
              const metadata = await Metadata.find({})
              console.log('metadata', metadata.length)
              res.json(metadata.map((m) => m.toObject()))
            },
          },
        ],
      },
    },
  ),
)
