const redis = require("async-redis")

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

redisClient.on("connect", () => {
    console.log("Redis Connection successful")
})

redisClient.on("error", (err) => {
    console.log("Something went wrong wuth the redis connection " + err.message)
})

module.exports = redisClient