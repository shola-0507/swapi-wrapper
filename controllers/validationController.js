const { COMMENTS_REQUIRED_DATA } = require("../logic/constants")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")
const { validate } = require("../logic/helpers")

exports.validateComments = (req, res, next) => {
    try {
        const errors = validate(req.body, COMMENTS_REQUIRED_DATA) 
        if (Object.entries(errors).length !== 0) return sendFailureResponse(res, "validation failed", errors)
        
        next()
    } catch(error) {
        return sendSuccessResponse(res, "Something went wrong retriving the data", error.message)
    }

}