const Redis = require("ioredis");

/**
 * Redis connection
 * Used as durable event queue
 */
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379
});

module.exports = redis;
