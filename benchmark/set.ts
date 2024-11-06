import { Bench } from "tinybench";
import { Jedis } from "../src";
import { createRedisClient } from "./redis-factory";
import {
  FIXED_VALUE_VLONG,
  FIXED_VALUE_LONG,
  FIXED_VALUE_SHORT,
  FIXED_VALUE_VSHORT,
} from "./data";

const redis = await createRedisClient();
const jedis = new Jedis();

const bench = new Bench({
  name: "SET benchmark",
  time: 1000,
  iterations: 30,
});

bench
  .add("jedis - set - vlong", async () => {
    await jedis.strings.set(String(Date.now), FIXED_VALUE_VLONG);
  })
  .add("jedis - set - long", async () => {
    await jedis.strings.set(String(Date.now), FIXED_VALUE_LONG);
  })
  .add("jedis - set - short", async () => {
    await jedis.strings.set(String(Date.now), FIXED_VALUE_SHORT);
  })
  .add("jedis - set - vshort", async () => {
    await jedis.strings.set(String(Date.now), FIXED_VALUE_VSHORT);
  })
  .add("redis - set - vlong", async () => {
    await redis.set(String(Date.now), FIXED_VALUE_VLONG);
  })
  .add("redis - set - long", async () => {
    await redis.set(String(Date.now), FIXED_VALUE_LONG);
  })
  .add("redis - set - short", async () => {
    await redis.set(String(Date.now), FIXED_VALUE_SHORT);
  })
  .add("redis - set - vshort", async () => {
    await redis.set(String(Date.now), FIXED_VALUE_VSHORT);
  });

await bench.run();
await redis.disconnect();
// await container.stop();

console.log(bench.name);
console.table(bench.table());
process.exit(0);
