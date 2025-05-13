## Database Schema

### User Model (`server/src/db/models/User.ts`)

```typescript
{
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Hashed password
  cookie: String, // Session cookie or identifier
  admin: { type: Boolean, default: false },
  visits: { type: Number, default: 0 },
  accessLevel: { type: String, enum: ['user', 'admin'], default: 'user' },
  roles: { type: [String], default: [] },
  metadata: { type: Object, default: {} }, // General purpose metadata store
  pinned: { type: [Schema.Types.ObjectId], ref: 'Metadata', default: [] }, // References to pinned Metadata objects
  starred: { type: [Schema.Types.ObjectId], ref: 'Metadata', default: [] }, // References to starred Metadata objects
  timestamps: true // Adds createdAt and updatedAt fields
}
```

### Metadata Model (`server/src/db/models/prototypes/Metadata.ts`)

```typescript
{
  name: String,
  metadata: { type: Object, default: {} }, // Represents a "larger collection", e.g., a tree node.
  upload: { type: Object, default: {} }, // Stores upload-related metadata.
  parent: String, // Identifier for a parent object (could be ID or path).
  // Scoping queries (singular)
  type: { type: String, required: true }, // The type of metadata (e.g., 'note', 'image', 'folder').
  scope: String, // A specific scope or context for the metadata.
  items: { type: [mongoose.Schema.Types.Mixed], default: [] }, // Array of mixed-type items associated with this metadata.
  // Content fields
  text: String, // Plain text content.
  md: String, // Markdown content.
  // Lookup helpers
  tags: { type: [String], default: [] }, // Array of tags for searching/filtering.
  // Standard flags
  public: { type: Boolean, default: false }, // Indicates if the metadata is publicly accessible.
  deleted: { type: Boolean }, // Soft delete flag.
  status: { type: String }, // Status indicator (e.g., 'draft', 'published').
  // Other flags
  verified: { type: Boolean }, // Verification status.
  model: String, // Associated model name (if applicable).
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User who created it.
  // Potential field for external linking
  foreignId: String, // Identifier from an external system.
  timestamps: true, // Adds createdAt and updatedAt fields.
  strict: false // Allows fields not explicitly defined in the schema.
}
```

### Song Model (`server/src/db/models/legacy/Song.ts`)

```typescript
{
  artistId: String,
  name: String,
  path: String, // File path or URL to the song file.
  folder: String, // Folder where the song is located.
  metadata: {}, // Generic object for additional song metadata.
}
```
