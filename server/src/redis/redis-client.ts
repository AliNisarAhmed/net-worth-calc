import Redis from "ioredis";

const url = process.env.REDIS_URL || "127.0.0.1:6379";

const client = new Redis(url);

export default client;
