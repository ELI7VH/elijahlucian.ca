import { Router } from 'express'
import { s3 } from '../services/s3'
import { Metadata } from '../db/models'
import { isAdmin, isLoggedIn } from './middleware'

export default async () => {
  const s3Client = s3()

  const router = Router()

  router.post('/uploads', isAdmin, async (req, res) => {
    const { name, mime, filename, type } = req.body

    const record = await Metadata.create({
      type: 'upload',
      status: 'pending',
      name,
      metadata: {
        filename,
        mime,
      },
      user: res.locals.user,
    })

    console.log('locals ->', res.locals)

    const key = [res.locals.userId, record.id, req.body.filename].join('/')

    const signedUrl = await s3Client.signedUrl(key, type)

    console.log('signedUrl ->', signedUrl)

    await Metadata.updateOne(
      { _id: record._id },
      { $set: { metadata: { ...record.metadata, signedUrl } } },
    )

    const updated = await Metadata.findById(record._id)

    res.json(updated)
  })

  router.get('/uploads', isLoggedIn, async (req, res) => {
    const records = await Metadata.find({
      type: 'upload',
    })
    res.json(records)
  })

  router.get('/uploads/:id', isLoggedIn, async (req, res) => {
    const record = await Metadata.findById(req.params.id)
    res.json(record)
  })

  router.patch('/uploads/:id', isAdmin, async (req, res) => {
    const record = await Metadata.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(record)
  })

  router.delete('/uploads/:id', isAdmin, async (req, res) => {
    const record = await Metadata.findByIdAndDelete(req.params.id)
    res.json(record)
  })

  return router
}
