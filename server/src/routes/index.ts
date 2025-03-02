import { RequestHandler, Router } from 'express'
import { Metadata, User } from '../db/models'
import { isLoggedIn } from './middleware'

export default () => {
  const router = Router()

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
    console.log('req.body', req.body)

    const song = await Metadata.create({
      ...req.body,
      type: 'upload',
      scope: 'music',
      createdBy: res.locals.user.id,
    })

    console.log('song', song)

    res.json(song)
  })

  router.patch('/playlists/:id/reorder', isAdmin, async (req, res) => {
    const playlist = await Metadata.findById(req.params.id)

    playlist.items = req.body.items

    // insert at index // double check this works
    playlist.items.splice(
      req.body.index,
      0,
      playlist.items.splice(req.body.oldIndex, 1)[0],
    )

    await playlist.save()

    res.json(playlist)
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
      starred: res.locals.user.starred,
      metadata: res.locals.user.metadata,
    })
  })

  router.patch('/auth/me', isLoggedIn, async (req, res) => {
    const user = res.locals.user

    const { id, admin, accessLevel, roles, visits, ...body } = req.body

    console.log('update user', user.id, body)
    const updated = await User.findByIdAndUpdate(user.id, body, { new: true })
    console.log('update user', user.id, updated)
    res.json(updated)
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
