import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URL!);

async function main() {
  const keys = await redis.keys('comic:panel:*');
  if (keys.length === 0) {
    console.log('No comic cache keys found.');
  } else {
    await redis.del(...keys);
    console.log(`Deleted ${keys.length} keys:`, keys);
  }
  redis.disconnect();
}

main().catch(console.error);
