import { RequestHandler, Router } from 'express'
import { Metadata, User } from '../db/models'

export default () => {
  const router = Router()

  const isAdmin: RequestHandler = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth) {
      console.log('auth', auth)
      res.status(401).json({ message: 'Require Authorization' })
      return
    }

    const devId = process.env.LOGGED_IN_USERID
    const user = devId
      ? await User.findById(devId)
      : await User.findOne({ cookie: auth })

    if (!user || !user.admin) {
      console.log('auth', auth, 'userid', user?.id, 'admin', user?.admin)
      res.status(401).json({ message: 'Nice Try, HACKER!' })
      return
    }

    console.log('admin user', user.id)

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

  // AUTH

  router.post('/login', async (req, res) => {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    })

    if (!user) {
      res.status(401).json({ message: 'Invalid Credentials' })
      return
    }

    user.cookie = req.headers.authorization
    await user.save()

    res.json(user)
  })

  router.post('/logout', async (req, res) => {
    const cookie = req.headers.authorization
    const user = await User.findOne({ cookie })

    if (!user) {
      res.status(401).json({ message: 'Require Authorization' })
      return
    }

    user.cookie = null
    await user.save()

    res.json({ message: 'Logged out' })
  })

  return router
}
