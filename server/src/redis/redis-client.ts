import * as redis from "redis";

const url = process.env.REDIS_URL;

const client = redis.createClient({ url });

export default client;
