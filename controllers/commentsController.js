const Comments = require("../models").Comment
const { checkDataExists } = require("../logic/helpers")
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

        if (!comments.length) return sendSuccessResponse(res, "No comment found")
        return sendSuccessResponse(res, "Comments retrived Successfully", comments)
    } catch (error) {
        return sendFailureResponse(res, "Something went wrong retriving the comments. Please try again later.")
    } 
}

exports.createComment = async (req, res) => {
    try {
        const body = req.body
        const film_id = parseInt(req.params.id)
        const ip =  req.header("x-forwarded-for") || req.connection.remoteAddress

        if (body.comment.length > 500) return sendFailureResponse(res, "Comment should not be more than 500 characters", [], 400)
        
        const checkFilmExists = await checkDataExists(FILMS, "episode_id", film_id)
        if (!checkFilmExists.length) return sendSuccessResponse(res, "Film doesn't exist")

        const comment = await Comments.create({
            film_id: film_id,
            comment: body.comment,
            user_id: ip
        })

        return sendSuccessResponse(res, "Comment posted Successfully", comment)
    } catch (error) {
        return sendFailureResponse(res, "Something went wrong posting the comment. Please try again later.")
    }
}
