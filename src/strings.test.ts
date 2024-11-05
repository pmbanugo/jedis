import { describe, test, expect, beforeAll } from "vitest";
import { Jedis } from "./index";

describe("StringCommands", () => {
  let jedis: Jedis;

  beforeAll(() => {
    jedis = new Jedis();
  });

  test("set and get string values", async () => {
    await jedis.strings.set("key1", "value1");
    const value = await jedis.strings.get("key1");
    expect(value).toBe("value1");
  });

  test("set with expiry", async () => {
    await jedis.strings.set("expiry-key", "temp-value", {
      expireInMilliseconds: 50,
    });
    let value = await jedis.strings.get("expiry-key");
    expect(value).toBe("temp-value");

    await new Promise((resolve) => setTimeout(resolve, 60));
    value = await jedis.strings.get("expiry-key");
    expect(value).toBeNull();
  });

  test("increment operations", async () => {
    await jedis.strings.set("counter", "10");

    const incr = await jedis.strings.increment("counter");
    expect(incr).toBe(11);

    const incrby = await jedis.strings.incrementBy("counter", 5);
    expect(incrby).toBe(16);
  });

  test("decrement operations", async () => {
    await jedis.strings.set("counter", "10");

    const decr = await jedis.strings.decrement("counter");
    expect(decr).toBe(9);

    const decrby = await jedis.strings.decrementBy("counter", 5);
    expect(decrby).toBe(4);
  });

  test("mset and mget operations", async () => {
    const entries = new Map([
      ["key1", "value1"],
      ["key2", "value2"],
      ["key3", "value3"],
    ]);

    await jedis.strings.mSet(entries);
    const values = await jedis.strings.mGet("key1", "key2", "key3");
    expect(values).toEqual(["value1", "value2", "value3"]);
  });

  test("del operation", async () => {
    await jedis.strings.set("temp-key", "temp-value");
    let value = await jedis.strings.get("temp-key");
    expect(value).toBe("temp-value");

    await jedis.strings.delete("temp-key");
    value = await jedis.strings.get("temp-key");
    expect(value).toBeNull();
  });

  test("set with setIfNotExists handles both existing and non-existing keys", async () => {
    // Should succeed for non-existing key
    const firstSet = await jedis.strings.set("conditional-key", "first-value", {
      setIfNotExists: true,
    });
    expect(firstSet).toBe("OK");
    expect(await jedis.strings.get("conditional-key")).toBe("first-value");

    // Should fail for existing key
    const secondSet = await jedis.strings.set("conditional-key", "new-value", {
      setIfNotExists: true,
    });
    expect(secondSet).toBeNull();
    expect(await jedis.strings.get("conditional-key")).toBe("first-value");
  });
});
