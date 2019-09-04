const Films = require("../models").Film
const { FILMS } = require("../logic/constants")
const { sortResponse, retrieveData } = require("../logic/helpers")
const { attachCommentsCount } = require("../logic/filmLogic")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getFilms = async (req, res) => {
    try {
        const films = await retrieveData(FILMS)
        if (!films.length) return sendSuccessResponse(res, "No film found")

        const film_data = await Films.findAll()
        const films_with_comments = attachCommentsCount(films, film_data)
        const response = films_with_comments.sort(sortResponse("release_date", "asc"))

        return sendSuccessResponse(res, "Success", response, 200)
    } catch (error) {
        return sendFailureResponse(res, "Something went wrong retriving the data: " + error.message)
    }
}
