const Comments = require("../models").Comment
const Films = require("../models").Film
const { fetchDataFromSwapi, sortResponse } = require("../logic/helpers")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")
const { FILMS } = require("../logic/constants")


exports.getComments = async (req, res) => {
    try {
        const id = req.params.id
        let comments = await Comments.findAll({
            where: {
                film_id: id
            }
        })

        comments = comments.sort(sortResponse("createdAt"))
        sendSuccessResponse(res, "Comments retrived Successfully", comments)
    } catch (error) {
        sendFailureResponse(res, error.message)
    } 
}

exports.createComment = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const ip =  req.header("x-forwarded-for") || req.connection.remoteAddress

        if (body.comment.length > 500) {
            sendFailureResponse(res, "Comment should not be more than 500 characters")
        }

        await fetchDataFromSwapi(FILMS + "/" + id)
        let film = await Films.findAll({
            where: { id }
        }) 
        console.log(film)
        
        if (film.length === 0) {
            film = await Films.create({ id })
        } else {
            film = film[0]["dataValues"]
        }
        
        const comment = await Comments.create({
            film_id: id,
            comment: body.comment,
            user_id: ip
        })

        await Films.update({ comment_count: film.comment_count + 1 }, {
            where: { id }
        })

        sendSuccessResponse(res, "Comment posted Successfully", comment)
    } catch (error) {
        sendFailureResponse(res, error.message)
    }
}
