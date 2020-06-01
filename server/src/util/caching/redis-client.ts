import redis from "redis";
const redisClient = redis.createClient();
export default redisClient;
// module.exports = require("redis").createClient();
