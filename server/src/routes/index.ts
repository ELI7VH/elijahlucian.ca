import { RequestHandler, Router } from 'express'
import { Metadata, User } from '../db/models'

export default () => {
  const router = Router()

  const isLoggedIn: RequestHandler = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth) {
      res.status(401).json({ message: 'Not logged in' })
      return
    }

    const user = await User.findOne({ cookie: auth })

    if (!user) {
      res.status(401).json({ message: 'Not logged in' })
      return
    }

    console.log('logged in user', user.id)

    res.locals.user = user
    next()
  }

  const isAdmin: RequestHandler = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth) {
      console.log('auth', auth)
      res.status(401).json({ message: 'Require Authorization' })
      return
    }

    const user = await User.findOne({ cookie: auth })

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

  // AUTH

  router.get('/auth/me', isLoggedIn, async (req, res) => {
    res.json({
      id: res.locals.user.id,
      email: res.locals.user.email,
      name: res.locals.user.name,
      username: res.locals.user.username,
      cookie: res.locals.user.cookie,
      admin: res.locals.user.admin,
    })
  })

  router.patch('/auth/me', isLoggedIn, async (req, res) => {
    const user = res.locals.user

    // await user.save()

    res.json(user)
  })

  router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({
      username,
      password,
    })

    if (!user) {
      res.status(401).json({ message: 'Invalid Credentials' })
      return
    }

    user.cookie = crypto.randomUUID()
    await user.save()

    res.json(user)
  })

  router.post('/auth/logout', isLoggedIn, async (req, res) => {
    const user = res.locals.user

    console.log('logging out user', user.id)

    user.cookie = null
    await user.save()

    res.json({ message: 'Logged out' })
  })

  return router
}
