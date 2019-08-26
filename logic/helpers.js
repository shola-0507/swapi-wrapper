const axios = require("axios")
const redisClient = require("./connection")

const fetchDataFromSwapi = async (url) => {
    const response = await axios.get(process.env.SWAPI_URL + url)
    return response.data
}

const validate = (body, required) => {
    const errors = {}
    const required_data = Object.keys(required)

    required_data.forEach((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!body.hasOwnProperty(key) || typeof body[key] != required[key]) {
            errors[key] = `${key} should be a ${required[key]}`
        }
    })
    
    return errors
}

const filter = (data= [], param, value) => {
    data = data.filter((obj) => {
        return obj[param] === value
    })

    return data
}

const sortResponse = (prop, order= "desc") => (a, b) => {
    let value_a
    let value_b
    switch (prop) {
    case "release_date":
        value_a = new Date(a[prop])
        value_b = new Date(b[prop])

        if (order === "desc") return value_b > value_a
        return value_b < value_a
    default:
        if (order === "desc") return b > a
        return b < a
    }
}

const fetchPaginatedData = async (type) => {
    let response = await fetchDataFromSwapi(type)
    let data = response.results
    
    while(response.next) {
        let new_page = await axios.get(response.next)
        new_page = new_page.data

        data = data.concat(new_page.results)
        response = new_page
    }
    
    return data 
}

const retrieveData = async (type) => {
    let response = await getDataFromRedis(type)
    if (!response) return await fetchAndSaveDataToRedis(type)
    return response
}

const fetchAndSaveDataToRedis = async (type) => {
    let response = await fetchPaginatedData(type)
    response = JSON.stringify(response)
    await saveDataToRedis(type, response)
    return response
}

const saveDataToRedis = async (key, value) => {
    await redisClient.set(key, value)
}

const getDataFromRedis = async (key) => {
    const data = await redisClient.get(key)
    return data
}

module.exports = {
    getDataFromRedis,
    saveDataToRedis,
    fetchAndSaveDataToRedis,
    retrieveData,
    fetchPaginatedData,
    sortResponse,
    filter,
    validate,
    fetchDataFromSwapi
}