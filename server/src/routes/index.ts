import { Router } from 'express'
import { Metadata } from '../db/models'

export default () => {
  const router = Router()

  router.get('/songs', async (req, res) => {
    const songs = await Metadata.find({ type: 'upload', scope: 'music' })

    res.json(songs)
  })

  router.get('/songs/:id', async (req, res) => {
    const song = await Metadata.findById(req.params.id)

    res.json(song)
  })

  router.patch('/songs/:id', async (req, res) => {
    const song = await Metadata.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.json(song)
  })

  router.delete('/songs/:id', async (req, res) => {
    await Metadata.findByIdAndDelete(req.params.id)

    res.json({ message: 'Song deleted' })
  })

  router.post('/songs', async (req, res) => {
    const song = await Metadata.create({
      ...req.body,
      type: 'upload',
      scope: 'music',
    })

    res.json(song)
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
