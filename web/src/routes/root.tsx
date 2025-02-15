import { App } from '@/App'
import { Route, Routes } from 'react-router-dom'

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  )
}
