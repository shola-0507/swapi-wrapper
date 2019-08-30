const Films = require("../models").Film
const { FILMS } = require("../logic/constants")
const { sortResponse, retrieveData, extractFields } = require("../logic/helpers")
const { attachCommentsCount } = require("../logic/filmLogic")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getFilms = async (req, res) => {
    try {
        const films = await retrieveData(FILMS)
        if (!films.length) return sendFailureResponse(res, "No film found", [], 404)

        const film_data = await Films.findAll()
        const trimmed_films = extractFields(films, ["episode_id", "title", "release_date", "opening_crawl"])
        const films_with_comments = attachCommentsCount(trimmed_films, film_data)
        const response = films_with_comments.sort(sortResponse("release_date", "asc"))

        return sendSuccessResponse(res, "Success", response, 200)
    } catch (error) {
        console.log(error.message)
        return sendFailureResponse(res, "Something went wrong retriving the data: " + error.message)
    }
}
