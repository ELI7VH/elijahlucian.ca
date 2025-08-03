import {
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const s3 = () => {
  // todo: a database setting

  const accessKeyId = process.env.SPACES_KEY
  const secretAccessKey = process.env.SPACES_SECRET
  const host = process.env.SPACES_HOST
  const region = process.env.SPACES_REGION

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set')
  }

  if (!host || !region) {
    throw new Error('SPACES_HOST and SPACES_REGION must be set')
  }

  //https://lawnz-dev.tor1.digitaloceanspaces.com

  const spaces = new S3Client({
    forcePathStyle: false,
    region,
    endpoint: `https://${region}.${host}`,
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

    const signedUrl = await getSignedUrl(spaces, command, { expiresIn: 60 * 5 }) // 5 minutes

    return signedUrl
  }

  const deleteObject = async (key: string) => {
    const command = new DeleteObjectCommand({
      Bucket: process.env.SPACES_BUCKET,
      Key: key,
    })
    await spaces.send(command)
  }

  const listObjects = async () => {
    const command = new ListObjectsCommand({
      Bucket: process.env.SPACES_BUCKET,
    })
    const response = await spaces.send(command)
    return response.Contents
  }

  return { spaces, signedUrl, deleteObject, listObjects }
}
