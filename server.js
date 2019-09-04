require("dotenv").config() // configure environment variables
const models = require("./models")

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

module.exports = server