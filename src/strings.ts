import { Database } from "lmdb";
import type { SetOptions, StoredValue } from "./types";

export class StringCommands {
  private _db: Database;

  constructor(db: Database) {
    this._db = db;
  }

  async set(
    key: string,
    value: string | number,
    options: SetOptions = {}
  ): Promise<"OK" | null> {
    if (!key || !value) return null;

    const { expireInMilliseconds, setIfNotExists } = options;
    const existingValue = await this._db.get(key);

    if (setIfNotExists && existingValue) {
      return null;
    }

    if (expireInMilliseconds) {
      const storedValue: StoredValue = {
        value: value.toString(),
        expireAt: Date.now() + expireInMilliseconds,
      };
      await this._db.put(key, storedValue);
    } else {
      await this._db.put(key, value.toString());
    }

    return "OK";
  }

  async get(key: string): Promise<string | null> {
    if (!key) return null;

    const value: string | StoredValue = await this._db.get(key);

    if (!value) return null;
    if (typeof value === "string") return value;

    if (value.expireAt !== undefined && Date.now() > value.expireAt) {
      await this._db.remove(key);
      return null;
    }
    return value.value;
  }

  async increment(key: string): Promise<number> {
    const value = await this.get(key);
    const newValue = (parseInt(value!) || 0) + 1;
    await this.set(key, newValue);
    return newValue;
  }

  async decrement(key: string): Promise<number> {
    const value = await this.get(key);
    const newValue = (parseInt(value!) || 0) - 1;
    await this.set(key, newValue);
    return newValue;
  }

  async incrementBy(key: string, increment: number): Promise<number> {
    const value = await this.get(key);
    const newValue = (parseInt(value!) || 0) + increment;
    await this.set(key, newValue);
    return newValue;
  }

  async decrementBy(key: string, decrement: number): Promise<number> {
    const value = await this.get(key);
    const newValue = (parseInt(value!) || 0) - decrement;
    await this.set(key, newValue);
    return newValue;
  }

  async mSet(entries: Map<string, string | number>): Promise<"OK" | null> {
    if (entries.size === 0) return null;
    const operations = [];

    for (const [key, value] of entries) {
      if (!key || !value) break;
      operations.push(this._db.put(key, value.toString()));
    }

    await Promise.all(operations);
    return "OK";
  }

  async mGet(...keys: string[]): Promise<(string | null)[]> {
    return Promise.all(keys.map((key) => this.get(key)));
  }

  async delete(key: string): Promise<boolean> {
    return this._db.remove(key);
  }
}
