const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes/api")

const api = express()

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

api.use("/api/v1/", routes)

api.use(function(req, res) {
    return res.status(404).json({ success: false, message: "This route doesn't exist on this service" })
})

module.exports = api