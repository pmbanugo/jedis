import { createClient } from "redis";

export async function createRedisClient() {
  const redis = createClient({
    url: "redis://localhost:6379",
  });
  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
  console.log("Redis Client connected");
  return redis;
}
