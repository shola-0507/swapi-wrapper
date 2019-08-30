const { PEOPLE, FILMS } = require("../logic/constants")
const { getMetaData, extractCharacterIds, getCharacters } = require("../logic/peopleLogic")
const { retrieveData, filterBy, sortResponse } = require("../logic/helpers")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getCharacters = async (req, res) => {
    try {
        const query = req.query
        const sortBy = query.sortBy
        const sortIn = query.sortIn ? query.sortIn : "desc"
        const gender = query.gender
        const movieId = query.episodeId
        let data = await retrieveData(PEOPLE)
        
        if (!data.length) return sendFailureResponse(res, "No person found", [], 404)

        if (movieId) {
            const filmData = await retrieveData(FILMS)
            const character_ids = extractCharacterIds(filmData, movieId)
            
            if (!character_ids.length) return sendFailureResponse(res, "No character found", [], 404)
            data = getCharacters(data, character_ids)
        }

        if (gender) data = data.filter(filterBy("gender", query.gender))
        if (sortBy) data = data.sort(sortResponse(sortBy, sortIn))
        const meta = getMetaData(data)

        return sendSuccessResponse(res, "Characters retrieved successfully", data, 200, meta)
    } catch (error) {
        return sendFailureResponse(res, "Something went wrong retrieving Characters", error.message)
    }
}