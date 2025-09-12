import { App } from '@/App'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminDashboard } from './admin'
import { Radio } from '@/widgets/Radio'
import { PlaylistWidget } from '@/widgets/PlaylistWidget'
import { SongInfo } from '@/widgets/SongInfo'
import { Null } from './null'
import { ThoughtAggregatorModule } from '@/widgets/ThoughtAggregatorModule'
import { DankVision } from '@/widgets/DankVision'
import { PinContainer } from '@/widgets/components/PinContainer'
import { useUserContext } from '@/lib'
import { Filez } from '@/widgets/Filez'
import { Scan } from './tools/scan'
import { UserContainer } from '@/widgets/components/UserContainer'
import { Layerz } from '@/widgets/components/Layerz'
import { GameContainer } from '@/widgets/components/GameContainer'
import { BaseLayer } from '@/widgets/BaseLayer'

export const RootRouter = () => {
  const user = useUserContext()
  // todo: Layercontext

  return (
    <>
      <Routes>
        <Route
          path="/null"
          element={user.user ? <Null /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={user.user ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route path="/tools/scan" element={<Scan />} />
        <Route path="/*" element={<App />} />
      </Routes>
      <Layerz>
        <GameContainer />
        <UserContainer />
        <PinContainer />
        <BaseLayer name="Desktop" color="var(--brand-1)" hotkey="d" i={1}>
          <Radio />
          <PlaylistWidget />
          <SongInfo />
          <ThoughtAggregatorModule />
          {/* <IdeaRepository />  */}
          <DankVision />
          {/* <PublicationManager />  */}
          <Filez />
        </BaseLayer>
      </Layerz>
    </>
  )
}
