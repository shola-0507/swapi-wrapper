/* eslint-disable no-unused-vars */
require("dotenv").config() // configure environment variables
const models = require("./models")
const { fetchAndSaveDataToRedis } = require("./logic/helpers")		
const { FILMS, PEOPLE } = require("./logic/constants")

models.sequelize.sync().then(() => {
    console.log("Database migrated!")
}).catch((err) => {
    console.log("Something went wrong with the database migration " + err.message)
})

const api = require("./api")
api.set("port", process.env.PORT)

const server = api.listen(api.get("port"), () => {
    console.log(`Api server running on PORT ${server.address().port}`)
})

// eslint-disable-next-line no-unexpected-multiline
server.on("listening", async () => {
    try {		
        const films = await fetchAndSaveDataToRedis(FILMS)		
        const people = await fetchAndSaveDataToRedis(PEOPLE)		
    
        console.log("Saved films and character data to redis")		
    } catch (error) {		
        console.log("something went wrong saving data to redis..." + error.message)		
    }
})

module.exports = server