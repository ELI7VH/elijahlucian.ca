import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const s3 = () => {
  const accessKeyId = process.env.SPACES_KEY
  const secretAccessKey = process.env.SPACES_SECRET

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set')
  }

  const spaces = new S3Client({
    region: process.env.SPACES_REGION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  const signedUrl = async (key: string, type: string) => {
    const command = new PutObjectCommand({
      Bucket: process.env.SPACES_BUCKET,
      Key: key,
      ACL: 'public-read',
      ContentType: type,
    })

    const signedUrl = await getSignedUrl(spaces, command, {
      expiresIn: 60 * 60, // 1 hour
    })

    return signedUrl
  }

  return { spaces, signedUrl }
}
