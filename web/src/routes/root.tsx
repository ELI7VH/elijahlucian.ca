import { App } from '@/App'
import { Route, Routes } from 'react-router-dom'
import { AdminDashboard } from './admin'
import { DesktopContainer } from '@/widgets/components/DesktopContainer'
import { Radio } from '@/widgets/Radio'
import { PlaylistWidget } from '@/widgets/PlaylistWidget'
import { SongInfo } from '@/widgets/SongInfo'
import { Null } from './null'
import { ThoughtAggregatorModule } from '@/widgets/ThoughtAggregatorModule'

export const RootRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/null" element={<Null />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/*" element={<App />} />
      </Routes>
      <DesktopContainer>
        <Radio />
        <PlaylistWidget />
        <SongInfo />
        <ThoughtAggregatorModule />
        {/* <IdeaRepository />  */}
        {/* <PublicationManager />  */}
      </DesktopContainer>
    </>
  )
}
