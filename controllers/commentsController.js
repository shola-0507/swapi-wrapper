const Comments = require("../models").Comment
const Films = require("../models").Film
const { checkDataExists } = require("../logic/helpers")
const { addFilmToDatabase } = require("../logic/filmLogic")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")
const { FILMS } = require("../logic/constants")


exports.getComments = async (req, res) => {
    try {
        const id = req.params.id
        const comments = await Comments.findAll({
            where: {
                film_id: id
            },
            order: [
                ["createdAt", "DESC"]
            ]
        })

        if (!comments.length) return sendFailureResponse(res, "No comment found", [], 404)
        return sendSuccessResponse(res, "Comments retrived Successfully", comments)
    } catch (error) {
        return sendFailureResponse(res, error.message)
    } 
}

exports.createComment = async (req, res) => {
    try {
        const body = req.body
        const film_id = parseInt(req.params.id)
        const ip =  req.header("x-forwarded-for") || req.connection.remoteAddress

        if (body.comment.length > 500) return sendFailureResponse(res, "Comment should not be more than 500 characters")
        
        const checkFilmExists = await checkDataExists(FILMS, "episode_id", film_id)
        if (!checkFilmExists.length) return sendFailureResponse(res, "Film not found", [], 404)

        const film = await addFilmToDatabase(film_id)
        
        const comment = await Comments.create({
            film_id: film_id,
            comment: body.comment,
            user_id: ip
        })

        await Films.update({ comment_count: film.comment_count + 1 }, {
            where: { id: film_id }
        })
        return sendSuccessResponse(res, "Comment posted Successfully", comment)
    } catch (error) {
        return sendFailureResponse(res, error.message)
    }
}
