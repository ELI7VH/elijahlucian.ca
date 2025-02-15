import { Router } from 'express'
import { Metadata } from '../db/models'

export default () => {
  const router = Router()

  router.get('/songs', async (req, res) => {
    const songs = await Metadata.find({ type: 'upload', scope: 'music' })

    res.json(songs)
  })

  router.get('/me', async (req, res) => {
    // const user = await User.findById(req.user.id)

    res.json({
      id: 'user',
      email: 'test@test.com',
      name: 'Test User',
    })
  })

  return router
}
