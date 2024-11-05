export interface SetOptions {
  /**
   * Set the specified expire time, in milliseconds
   */
  expireInMilliseconds?: number;

  /**
   * Only set the key if it does not already exist
   */
  setIfNotExists?: boolean;
}

export interface StoredValue {
  value: string;
  expireAt?: number;
}

export interface JedisOptions {
  path?: string;
  enableCompression?: boolean;
}
