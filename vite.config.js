import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Disable the refresh/only-export-components rule
      refresh: {
        exclude: [],
        include: [],
      },
    }),
  ],
})
