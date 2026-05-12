import { S3Client, PutObjectCommand, CreateBucketCommand } from '@aws-sdk/client-s3';
import { env } from '../../config/env';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

async function ensureBucket(): Promise<void> {
  await s3.send(new CreateBucketCommand({ Bucket: env.R2_BUCKET_NAME }));
}

export async function uploadBuffer(
  key: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const put = () =>
    s3.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }),
    );

  try {
    await put();
  } catch (err: unknown) {
    const code = (err as { Code?: string; name?: string }).Code ?? (err as { name?: string }).name;
    if (code === 'NoSuchBucket') {
      await ensureBucket();
      await put();
    } else {
      throw err;
    }
  }

  return `${env.R2_PUBLIC_URL}/${key}`;
}
