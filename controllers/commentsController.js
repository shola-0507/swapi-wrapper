const Comments = require("../models").Comment
const Films = require("../models").Film
const { checkDataExists } = require("../logic/helpers")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")
const { FILMS } = require("../logic/constants")


exports.getComments = async (req, res) => {
    try {
        const id = req.params.id
        let comments = await Comments.findAll({
            where: {
                film_id: id
            },
            order: [
                ["createdAt", "DESC"]
            ]
        })

        if (!comments.length) return sendFailureResponse(res, "No comment found", [], 404)

        sendSuccessResponse(res, "Comments retrived Successfully", comments)
    } catch (error) {
        sendFailureResponse(res, error.message)
    } 
}

exports.createComment = async (req, res) => {
    try {
        const body = req.body
        const id = parseInt(req.params.id)
        const ip =  req.header("x-forwarded-for") || req.connection.remoteAddress

        if (body.comment.length > 500) return sendFailureResponse(res, "Comment should not be more than 500 characters")
        
        let film = await checkDataExists(FILMS, "episode_id", id)
        if (!film.length) return sendFailureResponse(res, "Film not found", [], 404)

        film = await Films.findOrCreate({
            where: { id }
        }) 
        
        film = film[0]["dataValues"]
        
        const comment = await Comments.create({
            film_id: id,
            comment: body.comment,
            user_id: ip
        })

        await Films.update({ comment_count: film.comment_count + 1 }, {
            where: { id }
        })

        return sendSuccessResponse(res, "Comment posted Successfully", comment)
    } catch (error) {
        return sendFailureResponse(res, error.message)
    }
}
