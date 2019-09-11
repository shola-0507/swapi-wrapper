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
        
        if (!data.length) return sendSuccessResponse(res, "No character found")

        if (movieId) {
            const filmData = await retrieveData(FILMS)
            const character_ids = extractCharacterIds(filmData, movieId)
            
            if (!character_ids.length) return sendSuccessResponse(res, "No character found")
            data = getCharacters(data, character_ids)
        }

        if (gender) data = data.filter(filterBy("gender", query.gender))
        if (sortBy) data = data.sort(sortResponse(sortBy, sortIn))
        const meta = getMetaData(data)

        return sendSuccessResponse(res, "Characters retrieved successfully", data, 200, meta)
    } catch (error) {
        console.log(error.message)
        return sendFailureResponse(res, "Something went wrong retriving the characters. Please try again later.")
    }
}