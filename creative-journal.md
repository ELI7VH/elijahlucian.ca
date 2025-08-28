## Recent Updates

### HotkeyButton Component (2024-12-19)

Created a new `HotkeyButton` component that combines the existing `Button` component with hotkey functionality using the `useHotkey` hook. This component:

- Provides visual feedback when hotkeys are pressed (scale animation)
- Supports both click and hotkey interactions
- Automatically handles hotkey event prevention and propagation
- Includes proper TypeScript typing and accessibility features

**Location**: `web/src/lib/components/elements/HotkeyButton.tsx`

**Usage**:

```typescript
<HotkeyButton
  variant="text"
  size="small"
  onClick={handleClick}
  hotkey={(e) => e.key === 'ArrowLeft' && e.shiftKey}
  hotkeyLabel="Previous (shift + left arrow)"
>
  ➢
</HotkeyButton>
```

**Features**:

- Animated button press feedback on hotkey activation
- Configurable animation duration and style
- Proper event handling and accessibility
- Seamless integration with existing Button component API

**Replaced**:

- Removed `useHotkeyMap` usage from `App.tsx` and `Bub3.tsx`
- Replaced regular `Button` components with `HotkeyButton` where hotkey functionality was needed
- Added size control hotkeys to `Bub3` component (shift + +, shift + \_, =)

### GameContainer Cursor Input (2025-01-08)

- Added `a-mud-for-the-people` as a submodule under `.references/`
- Implemented hidden input cursor-driven text entry in `web/src/widgets/components/GameContainer.tsx`
- Behavior mirrors MUD-style UI: input is captured via an invisible field, echoed on screen with a block cursor, submits on Enter
- Ready to wire to game command handling or backend as needed
- Adopted MUD visual style (colors, font) for the GameContainer play mode
- Colors: background `#342e37`, foreground `#fafffd`, accent `#3c91e6`
- Font: `Josefin Sans` with system fallbacks
- Applied in `web/index.html` (font link) and `web/public/index.css` (body styles)

**Locations**:
- `.references/a-mud-for-the-people`
- `web/src/widgets/components/GameContainer.tsx`

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
