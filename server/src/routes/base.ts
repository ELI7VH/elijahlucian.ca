import { Router } from 'express'
import { Metadata } from '../db/models/prototypes/Metadata'
import { isLoggedIn } from './middleware'

export default async () => {
  const router = Router()

  const resources = [
    { path: 'resources', type: 'route', scope: 'base' },
    { path: 'songs', type: 'upload', scope: 'music' },
    { path: 'playlists', type: 'playlist', scope: 'music' },
    { path: 'thoughts', type: 'notes', scope: 'thoughts' },
  ]

  resources.forEach((resource) => {
    router.get(`/${resource.path}`, async (req, res) => {
      const items = await Metadata.find({
        type: resource.type,
        scope: resource.scope,
      })
      res.json(items)
    })

    router.get(`/${resource.path}/:id`, async (req, res) => {
      const item = await Metadata.findById(req.params.id)
      res.json(item)
    })

    router.post(`/${resource.path}`, isLoggedIn, async (req, res) => {
      const item = await Metadata.create({
        ...req.body,
        type: resource.type,
        scope: resource.scope,
      })
      res.json(item)
    })

    router.patch(`/${resource.path}/:id`, isLoggedIn, async (req, res) => {
      const item = await Metadata.findById(req.params.id)

      if (!item) {
        res.status(404).json({ message: 'Item not found' })
        return
      }

      const updated = await Metadata.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      )
      res.json(updated)
    })

    router.delete(`/${resource.path}/:id`, isLoggedIn, async (req, res) => {
      await Metadata.findByIdAndDelete(req.params.id)
      res.json({ message: 'Item deleted' })
    })
  })

  return router
}
