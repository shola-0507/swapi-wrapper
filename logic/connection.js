const redis = require("async-redis")

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
})

redisClient.on("connect", () => {
    console.log("Redis Connection successful")
})

redisClient.on("error", (err) => {
    console.log("Something went wrong wuth the redis connection " + err.message)
})

module.exports = redisClient