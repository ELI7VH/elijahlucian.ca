import { Router } from 'express'
import { s3 } from '../services/s3'
import { Metadata } from '../db/models'
import { isAdmin, isLoggedIn } from './middleware'

export default async () => {
  const s3Client = s3()

  const router = Router()

  router.post('/uploads', isAdmin, async (req, res) => {
    const { name, mime, filename, type, size } = req.body

    const record = await Metadata.create({
      type: 'upload',
      status: '☮',
      name,
      metadata: {
        filename,
        mime,
        size,
      },
      user: res.locals.user,
    })

    const key = [mime, res.locals.userId, record.id, req.body.filename].join(
      '/',
    )

    const signedUrl = await s3Client.signedUrl(key, type)
    const link = `https://${process.env.SPACES_CDN}/${key}`

    await Metadata.updateOne(
      { _id: record._id },
      {
        $set: {
          metadata: { ...record.metadata, signedUrl, key },
          link,
        },
      },
    )

    const updated = await Metadata.findById(record._id)

    res.json(updated)
  })

  router.get('/static', isAdmin, async (req, res) => {
    const s3Client = s3()

    const key = req.query.key as string
    const objects = await s3Client.listObjects(key)

    const records = await Metadata.find({
      type: 'upload',
    })
    const recordsMap = new Map(records.map((r) => [r.metadata.key, r]))

    res.json(
      objects.map((o) => ({
        id: o.Key,
        ...o,
        record: recordsMap.get(o.Key)?.toJSON(),
      })),
    )
  })

  router.delete('/static', isAdmin, async (req, res) => {
    if (await Metadata.findOne({ 'metadata.key': req.query.key })) {
      res.status(400).json({ error: 'Record exists' })
      return
    }

    const key = req.query.key as string
    await s3Client.deleteObject(key)
    res.json({ message: 'Object deleted' })
  })

  router.get('/uploads', isLoggedIn, async (req, res) => {
    const records = await Metadata.find({
      type: 'upload',
    }).sort({ createdAt: -1 })
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
    const record = await Metadata.findById(req.params.id)

    if (!record) {
      res.status(404).json({ error: 'Record not found' })
      return
    }

    console.log('record.metadata.key ->', record.metadata.key)

    if (record.metadata.key) {
      await s3Client.deleteObject(record.metadata.key)
    }

    const result = await Metadata.findByIdAndDelete(req.params.id)
    res.json(result)
  })

  return router
}
