import { Client, GetPageInfoRequest } from 'instagram-graph-api'

export const instagram = () => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const pageId = process.env.INSTAGRAM_PAGE_ID

  if (!token || !pageId) {
    throw new Error('INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_PAGE_ID must be set')
  }

  const client = new Client(token, pageId)

  const getSubscribedUser = async (userId: string) => {
    return {
      subscribed: true,
    }
  }

  const removeFollower = async (userId: string) => {
    return true
  }

  const getInteractions = async (userId: string) => {
    return []
  }

  const cullFollowers = async () => {
    // maximise impression to interaction ratio

    const request = new GetPageInfoRequest(token, pageId)
    const response = await request.execute()

    const followers = response.getFollowers() as unknown as any[]

    for (const follower of followers) {
      const followDate = new Date(follower.getFollowDate())
      const interactions = await getInteractions(follower.getId())

      const subscribedUser = await getSubscribedUser(follower.getId())

      if (subscribedUser.subscribed) {
        continue
      }

      if (followDate < new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000)) {
        continue
      }

      if (interactions.length === 0) {
        await removeFollower(follower.getId())
      }

      const monthsSinceFollow =
        (Date.now() - followDate.getTime()) / (30 * 24 * 60 * 60 * 1000)
      const expectedInteractions = Math.floor(monthsSinceFollow / 6)

      if (interactions.length < expectedInteractions) {
        await removeFollower(follower.getId())
      }
    }
  }

  return { cullFollowers }
}
