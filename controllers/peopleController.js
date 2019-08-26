const { PEOPLE } = require("../logic/constants")
const { insertMetaData } = require("../logic/peopleLogic")
const { retrieveData, filter, sortResponse } = require("../logic/helpers")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getPeople = async (req, res) => {
    try {
        const query = req.query
        let people = await retrieveData(PEOPLE)
        people = JSON.parse(people)
        
        if ("gender" in query) people = filter(people, "gender", query.gender)

        if ("sortBy" in query) { 
            const sortBy = query.sortBy
            const sortIn = query.sortIn ? query.sortIn : "desc" // 0 - ascending, 1- descending
            people = people.sort(sortResponse(sortBy, sortIn))
        }

        people = insertMetaData(people)
        return sendSuccessResponse(res, "Characters retrieved successfully", people)
        
    } catch (error) {
        sendFailureResponse(res, "Something went wrong retrieving Characters", error.message)
    }
}