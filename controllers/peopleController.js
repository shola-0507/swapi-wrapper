const { PEOPLE, FILMS } = require("../logic/constants")
const { insertMetaData, extractCharacterIds, getCharacters } = require("../logic/peopleLogic")
const { retrieveData, filter, sortResponse, extractFields } = require("../logic/helpers")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getAllCharacters = async (req, res) => {
    try {
        const query = req.query
        let people = await retrieveData(PEOPLE)
        
        if (!people.length) return sendFailureResponse(res, "No person found", [], 404)
        
        if ("gender" in query) people = filter(people, "gender", query.gender)

        if ("sortBy" in query) { 
            const sortBy = query.sortBy
            const sortIn = query.sortIn ? query.sortIn : "desc"
            people = people.sort(sortResponse(sortBy, sortIn))
        }

        const response = insertMetaData(people)
        return sendSuccessResponse(res, "Characters retrieved successfully", response)
        
    } catch (error) {
        sendFailureResponse(res, "Something went wrong retrieving Characters", error.message)
    }
}

exports.getFilmCharacters = async (req, res) => {
    try {
        const episode_id = req.params.id
        const query = req.query
        let films = await retrieveData(FILMS)
        let all_people = await retrieveData(PEOPLE)
        
        films = extractFields(films, ["episode_id", "characters"])
        const character_ids = extractCharacterIds(films, episode_id)
        
        if (!character_ids.length) return sendFailureResponse(res, "No character found", [], 404)

        let people = getCharacters(all_people, character_ids)

        if ("gender" in query) people = filter(people, "gender", query.gender)

        if ("sortBy" in query) { 
            const sortBy = query.sortBy
            const sortIn = query.sortIn ? query.sortIn : "desc"
            people = people.sort(sortResponse(sortBy, sortIn))
        }

        const response = insertMetaData(people)
        return sendSuccessResponse(res, "Characters retrieved successfully", response)
        
    } catch (error) {
        sendFailureResponse(res, "Something went wrong retrieving Characters", error.message)
    }
}