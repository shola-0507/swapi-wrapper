const { PEOPLE } = require("../logic/constants")
const { insertMetaData } = require("../logic/peopleLogic")
const { retrieveData, filter, sortResponse } = require("../logic/helpers")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getPeople = async (req, res) => {
    try {
        const query = req.query
        let people = await retrieveData(PEOPLE)
        people = JSON.parse(people)
        
        if (!people.length) return sendFailureResponse(res, "No person found", [], 404)
        
        if ("gender" in query) people = filter(people, "gender", query.gender)

        if ("sortBy" in query) { 
            const sortBy = query.sortBy
            const sortIn = query.sortIn ? query.sortIn : "asc"
            people = people.sort(sortResponse(sortBy, sortIn))
        }

        const response = insertMetaData(people)
        return sendSuccessResponse(res, "Characters retrieved successfully", response)
        
    } catch (error) {
        sendFailureResponse(res, "Something went wrong retrieving Characters", error.message)
    }
}