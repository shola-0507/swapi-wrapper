const Films = require("../models").Film
const { FILMS } = require("../logic/constants")
const { sortResponse, retrieveData, extractFields } = require("../logic/helpers")
const { attachCommentsCount } = require("../logic/filmLogic")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getFilms = async (req, res) => {
    try {
        let films = await retrieveData(FILMS)
        films = JSON.parse(films)

        if (!films.length) return sendFailureResponse(res, "No film found", [], 404)

        const film_data = await Films.findAll()
        films = extractFields(films, ["episode_id", "title", "release_date", "opening_crawl"])
        films = attachCommentsCount(films, film_data)
        films = films.sort(sortResponse("release_date", "asc"))

        return sendSuccessResponse(res, "Success", films, 200)
    } catch (error) {
        console.log(error.message)
        return sendFailureResponse(res, "Something went wrong retriving the data: " + error.message)
    }
}
