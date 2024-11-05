# Jedis - Redis (core) implemented in JavaScript

![Mace Windu](https://static1.moviewebimages.com/wordpress/wp-content/uploads/2023/06/samuel-l-jackson-star-wars-canva.jpg)

Jedis (JavaScript Embedded Data Store) is an in-process alternative to Redis, with the goal of being easy to **use, fast, and less memory footprint**. Its API is similar to Redis in most cases, but it is not a drop-in replacement.

It's intended to be used in scenarios where you want to work with Redis-like data structures, but you don't want to run a Redis server. It's the best choice if you want to use it in a single server/node, or run in a memory constrained environment.

> Store data efficiently, you must!

**Goals:**

- Implement a subset of Redis data structures
- Fast and lightweight memory usage
- Persistent: data doesn't have to fit in RAM
- Scalable across multiple processes or threads
- ACID compliant
- Efficient storage and retrieval of structured JS data types
- In-process API (no network overhead) but I might add a TCP/HTTP server in the future (if it's worth it).
- Not intended to be used as a drop-in replacement for Redis, but the API is closely modeled after Redis.
- Not intended for use in serverless function/edge environments

## Support

For the sake of external validation, please star the repo 💫

Want to support me financially, so that I spend more time on this project? I'm on [GitHub Sponsors](https://github.com/sponsors/pmbanugo) but my sponsor profile is a bit outdated for now. Reach out on [Twitter](https://twitter.com/p_mbanugo) or [LinkedIn](https://www.linkedin.com/in/pmbanugo/) if you want to talk about it.
