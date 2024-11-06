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

const key = String(Date.now);
const vLongKey = `vlong-${key}`,
  longKey = `long-${key}`,
  shortKey = `short-${key}`,
  vShortKey = `vshort-${key}`;

await setUpDatastore();

bench
  .add("jedis - get - vlong", async () => {
    await jedis.strings.get(vLongKey);
  })
  .add("jedis - get - long", async () => {
    await jedis.strings.get(longKey);
  })
  .add("jedis - get - short", async () => {
    await jedis.strings.get(shortKey);
  })
  .add("jedis - get - vshort", async () => {
    await jedis.strings.get(vShortKey);
  })
  .add("redis - get - vlong", async () => {
    await redis.get(vLongKey);
  })
  .add("redis - get - long", async () => {
    await redis.get(longKey);
  })
  .add("redis - get - short", async () => {
    await redis.get(shortKey);
  })
  .add("redis - get - vshort", async () => {
    await redis.get(vShortKey);
  });

await bench.run();
await redis.disconnect();
// await container.stop();

console.log(bench.name);
console.table(bench.table());
process.exit(0);

async function setUpDatastore() {
  await jedis.strings.set(vLongKey, FIXED_VALUE_VLONG);
  await jedis.strings.set(longKey, FIXED_VALUE_LONG);
  await jedis.strings.set(shortKey, FIXED_VALUE_SHORT);
  await jedis.strings.set(vShortKey, FIXED_VALUE_VSHORT);

  await redis.set(vLongKey, FIXED_VALUE_VLONG);
  await redis.set(longKey, FIXED_VALUE_LONG);
  await redis.set(shortKey, FIXED_VALUE_SHORT);
  await redis.set(vShortKey, FIXED_VALUE_VSHORT);
}
