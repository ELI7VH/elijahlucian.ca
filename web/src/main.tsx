import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootProvider } from './lib'
import { RootRouter } from './routes/root'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider>
      <RootRouter />
    </RootProvider>
  </StrictMode>,
)
