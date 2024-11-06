import { Database, open } from "lmdb";
import { StringCommands } from "./strings";
import { type JedisOptions } from "./types";

const JEDIS_NO_MEM_INIT = process.env.JEDIS_NO_MEM_INIT
  ? Boolean(process.env.JEDIS_NO_MEM_INIT)
  : undefined;

export class Jedis {
  public readonly strings: StringCommands;
  private db: Database;

  constructor(options: JedisOptions = {}) {
    this.db = open({
      name: "jedis",
      path: options.path,
      compression: options.enableCompression,
      //optional and intentionally hidden for internal exploration.
      noMemInit: JEDIS_NO_MEM_INIT,
      noSync: options.path === undefined, //don't flush to disk when path is undefined
    });
    this.strings = new StringCommands(this.db);
  }
}

export * from "./types";
