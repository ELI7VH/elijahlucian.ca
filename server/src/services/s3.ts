import {
  DeleteObjectCommand,
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
    region,
    endpoint: `https://${region}.${host}`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  const signedUrl = async (key: string, type: string) => {
    console.log('key ->', key)

    const command = new PutObjectCommand({
      Bucket: process.env.SPACES_BUCKET,
      Key: key,
      ACL: 'public-read',
      ContentType: type,
    })

    // https://lawnz-dev.tor1.digitaloceanspaces.com//688f95d3a2761bca05c25965/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO004JNCCMJ6T4AKBKAC%2F20250803%2Ftor1%2Fs3%2Faws4_request&X-Amz-Date=20250803T170107Z&X-Amz-Expires=300&X-Amz-Signature=4c68d7ff9ba50c870b301173ea8cae5c8fa9eec6a0a959b394662de0102e4c5b&X-Amz-SignedHeaders=host&x-amz-acl=public-read&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject

    const signedUrl = await getSignedUrl(spaces, command, {
      expiresIn: 60 * 5, // 5 minutes
    })

    console.log('signedUrl ->', signedUrl)

    return signedUrl
  }

  return { spaces, signedUrl }
}
