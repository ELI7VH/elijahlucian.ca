import { RequestHandler, Router } from 'express'
import { Metadata, User } from '../db/models'

export default () => {
  const router = Router()

  const isAdmin: RequestHandler = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth) {
      res.status(401).json({ message: 'Require Authorization' })
      return
    }

    const devId = process.env.LOGGED_IN_USERID
    const user = devId
      ? await User.findById(devId)
      : await User.findOne({ cookie: auth })

    console.log('auth', auth, 'userid', user?.id, 'admin', user?.admin)

    if (!user || !user.admin) {
      res.status(401).json({ message: 'Nice Try, HACKER!' })
      return
    }

    res.locals.user = user
    next()
  }

  router.get('/songs', async (req, res) => {
    const songs = await Metadata.find({ type: 'upload', scope: 'music' })

    res.json(songs)
  })

  router.get('/songs/:id', async (req, res) => {
    const song = await Metadata.findById(req.params.id)

    res.json(song)
  })

  router.patch('/songs/:id', isAdmin, async (req, res) => {
    const song = await Metadata.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.json(song)
  })

  router.delete('/songs/:id', isAdmin, async (req, res) => {
    await Metadata.findByIdAndDelete(req.params.id)

    res.json({ message: 'Song deleted' })
  })

  router.post('/songs', isAdmin, async (req, res) => {
    const song = await Metadata.create({
      ...req.body,
      type: 'upload',
      scope: 'music',
      createdBy: res.locals.user.id,
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
