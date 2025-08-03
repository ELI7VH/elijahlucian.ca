import { App } from '@/App'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminDashboard } from './admin'
import { DesktopContainer } from '@/widgets/components/DesktopContainer'
import { Radio } from '@/widgets/Radio'
import { PlaylistWidget } from '@/widgets/PlaylistWidget'
import { SongInfo } from '@/widgets/SongInfo'
import { Null } from './null'
import { ThoughtAggregatorModule } from '@/widgets/ThoughtAggregatorModule'
import { DankVision } from '@/widgets/DankVision'
import { PinContainer } from '@/widgets/components/PinContainer'
import { Grid, useUserContext } from '@/lib'
import { useForm } from 'react-hook-form'
import { Filez } from '@/widgets/Filez'
import { Scan } from './tools/scan'
import { UserContainer } from '@/widgets/components/UserContainer'

export const RootRouter = () => {
  const user = useUserContext()
  // todo: Layercontext

  return (
    <>
      <Routes>
        <Route path="/test" element={<Test />} />
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

      <UserContainer />
      <PinContainer />
      <DesktopContainer>
        <Radio />
        <PlaylistWidget />
        <SongInfo />
        <ThoughtAggregatorModule />
        {/* <IdeaRepository />  */}
        <DankVision />
        {/* <PublicationManager />  */}
        <Filez />
      </DesktopContainer>
    </>
  )
}

const Test = () => {
  const form = useForm({ defaultValues: { text: '' } })

  return (
    <Grid>
      <h4> Test</h4>

      <input {...form.register('text')} />
    </Grid>
  )
}
