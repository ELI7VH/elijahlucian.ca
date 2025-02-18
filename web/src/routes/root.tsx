import { App } from '@/App'
import { Route, Routes } from 'react-router-dom'
import { AdminDashboard } from './admin'
import { DesktopContainer } from '@/widgets/components/DesktopContainer'
import { Radio } from '@/widgets/Radio'
import { PlaylistWidget } from '@/widgets/PlaylistWidget'
import { SongInfo } from '@/widgets/SongInfo'

export const RootRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/*" element={<App />} />
      </Routes>
      <DesktopContainer>
        <Radio />
        <PlaylistWidget />
        <SongInfo />
      </DesktopContainer>
    </>
  )
}
