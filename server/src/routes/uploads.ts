import { Router } from 'express'
import { s3 } from '../services/s3'
import { Metadata } from '../db/models'
import { isLoggedIn } from './middleware'

export default async () => {
  const s3Client = s3()

  const router = Router()

  router.post('/uploads', isLoggedIn, async (req, res) => {
    const { name, mime, filename, type } = req.body

    console.log(res.locals)

    const key = [req.body.bucket, res.locals.userId, req.body.filename].join(
      '/',
    )

    const signedUrl = await s3Client.signedUrl(key, type)

    const record = await Metadata.create({
      type: 'upload',
      status: 'pending',
      name,
      metadata: {
        signedUrl,
        filename,
        mime,
      },
      user: res.locals.user,
    })

    res.json(record)
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

  router.patch('/uploads/:id', isLoggedIn, async (req, res) => {
    const record = await Metadata.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(record)
  })

  return router
}
