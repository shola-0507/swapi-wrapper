require("dotenv").config() // configure environment variables
const cron = require("node-cron") //to configure cron jobs
const { fetchAndSaveDataToRedis } = require("./logic/helpers")
const { FILMS, PEOPLE } = require("./logic/constants")
const models = require("./models")

models.sequelize.sync().then(() => {
    console.log("Database connected!")
}).catch((err) => {
    console.log("Something went wrong with the database connection " + err.message)
})

cron.schedule("0 */5 * * * *", async () => {
    console.log("-- running cron job --")
    try {
        const films = await fetchAndSaveDataToRedis(FILMS)
        const people = await fetchAndSaveDataToRedis(PEOPLE)

        console.log({ films, people })
        console.log("-- cron job completed--")
    } catch (error) {
        console.log("something went wrong send data to redis..." + error.message)
    }
})

const api = require("./api")
api.set("port", process.env.PORT)

const server = api.listen(api.get("port"), () => {
    console.log(`Api server running on PORT ${server.address().port}`)
})

module.exports = server