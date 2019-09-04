const Comments = require("../models").Comment
const { FILMS } = require("../logic/constants")
const { sortResponse, retrieveData } = require("../logic/helpers")
const { attachCommentsCount } = require("../logic/filmLogic")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")
const sequelize = require("sequelize")

exports.getFilms = async (req, res) => {
    try {
        const films = await retrieveData(FILMS)
        if (!films.length) return sendSuccessResponse(res, "No film found")

        const comments_data = await Comments.findAll({
            attributes: ["film_id", [sequelize.fn("COUNT", sequelize.col("film_id")), "comment_count"]],
            group: ["film_id"]
        })
        
        const films_with_comments = attachCommentsCount(films, comments_data)
        const response = films_with_comments.sort(sortResponse("release_date", "asc"))

        return sendSuccessResponse(res, "Success", response, 200)
    } catch (error) {
        return sendFailureResponse(res, "Something went wrong retriving the data: " + error.message)
    }
}
