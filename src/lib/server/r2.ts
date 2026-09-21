import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '$env/dynamic/private';

if (!env.R2_S3_ENDPOINT) throw new Error('R2_S3_ENDPOINT is not set');
if (!env.R2_ACCESS_KEY_ID) throw new Error('R2_ACCESS_KEY_ID is not set');
if (!env.R2_SECRET_ACCESS_KEY) throw new Error('R2_SECRET_ACCESS_KEY is not set');
if (!env.R2_BUCKET_NAME) throw new Error('R2_BUCKET_NAME is not set');

export const R2_BUCKET_NAME = env.R2_BUCKET_NAME;

export const r2 = new S3Client({
	region: 'auto',
	endpoint: env.R2_S3_ENDPOINT,
	credentials: {
		accessKeyId: env.R2_ACCESS_KEY_ID,
		secretAccessKey: env.R2_SECRET_ACCESS_KEY
	},
	// Prevent the SDK from baking a default (pre-body) checksum into presigned
	// URLs — R2 would reject the browser's PUT once the real bytes don't match it.
	requestChecksumCalculation: 'WHEN_REQUIRED'
});

// Bucket stays private; readers (e.g. thumbnails) get a short-lived signed GET
// instead of the object being made publicly accessible.
export function getFileUrl(key: string, expiresIn = 3600) {
	return getSignedUrl(r2, new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }), {
		expiresIn
	});
}

export const objectExists = async (key: string) => {
  try {
    await r2.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }))
    return true
  } catch {
    return false
  }
}

export const putObjectBytes = async (key: string, body: Buffer, contentType: string) => {
  await r2.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType : contentType
  }))
}

export const getObjectBytes = async (key : string ) => {
  const res = await r2.send(new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key : key
  }))
  return Buffer.from(await res.Body!.transformToByteArray());
}
