const { PEOPLE, FILMS } = require("../logic/constants")
const { insertMetaData } = require("../logic/peopleLogic")
const { retrieveData, filter, sortResponse, extractFields } = require("../logic/helpers")
const { sendSuccessResponse, sendFailureResponse } = require("../logic/response")

exports.getAllCharacters = async (req, res) => {
    try {
        const query = req.query
        let people = await retrieveData(PEOPLE)
        people = JSON.parse(people)
        
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
        const id = req.params.id
        const query = req.query
        let films = await retrieveData(FILMS)
        let people = await retrieveData(PEOPLE)
        films = JSON.parse(films)
        people = JSON.parse(people)

        if (!films.length) return sendFailureResponse(res, "No film found", [], 404)
        films = extractFields(films, ["episode_id", "characters"])

        let film = films.filter((obj) => {
            return obj.episode_id === parseInt(id)
        })
        
        let people_ids = film[0]["characters"].map((char) => {
            char = char.toString()
            return char.match(/\d+/g)[0]
        })

        people = people.filter((person) => {
            return people_ids.includes(person["url"].toString().match(/\d+/g)[0]) 
        })
        if (!people.length) return sendFailureResponse(res, "No film found", [], 404)
        console.log(people)

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