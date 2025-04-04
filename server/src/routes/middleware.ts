import { RequestHandler } from 'express'
import { User } from '../db/models'

export const isLoggedIn: RequestHandler = async (req, res, next) => {
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
  res.locals.userId = user.id
  next()
}
