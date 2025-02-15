import { App } from '@/App'
import { Route, Routes } from 'react-router-dom'
import { Home } from './home'

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/*" element={<App />} />
    </Routes>
  )
}
