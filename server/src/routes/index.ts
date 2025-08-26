import { Router } from 'express'
import { Metadata, User } from '../db/models'
import { isAdmin, isLoggedIn } from './middleware'

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

  // hydrated user context shit

  router.get('/me/pinned', isLoggedIn, async (req, res) => {
    const user = res.locals.user

    const pinnedIds = user.pinned

    const pinned = await Metadata.find({
      _id: { $in: pinnedIds },
    })

    res.json(pinned)
  })

  router.post('/me/pinned/:id', isLoggedIn, async (req, res) => {
    const user = res.locals.user

    if (user.pinned.includes(req.params.id)) {
      res.status(400).json({ message: 'Already pinned' })
      return
    }

    const pinned = await Metadata.findById(req.params.id)

    if (!pinned) {
      res.status(404).json({ message: 'Not found' })
      return
    }

    user.pinned.push(req.params.id)
    await user.save()

    res.json(user)
  })

  router.delete('/me/pinned/:id', isLoggedIn, async (req, res) => {
    const user = res.locals.user

    user.pinned = user.pinned.filter((id) => id !== req.params.id)
    await user.save()

    res.json(user)
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
      metadata: res.locals.user.metadata,
      starred: res.locals.user.starred,
      pinned: res.locals.user.pinned,
      telegramId: res.locals.user.telegramId,
      patreonId: res.locals.user.patreonId,
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

  router.get('/config', isAdmin, async (req, res) => {
    res.json({
      s3: {
        test: 'test',
        bucket: process.env.SPACES_BUCKET,
        region: process.env.SPACES_REGION,
      },
      api_port: process.env.API_PORT,
    })
  })

  return router
}
