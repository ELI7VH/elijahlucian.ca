export const patreon = () => {
  // https://docs.patreon.com/#introduction

  const clientId = process.env.PATREON_CLIENT_ID
  const clientSecret = process.env.PATREON_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Patreon client ID and secret are required')
  }

  // get users from patreon
  // create users in our database
  // update users in our database

  const getAccessToken = async () => {}
  const getUser = async (memberId: string) => {}
  const createUser = async (memberId: string) => {}

  return {}
}
