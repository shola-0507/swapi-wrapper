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

const filterBy = (param, value) => (obj= {}) => {
    return obj[param] === value
}

const sortResponse = (prop, order= "desc") => (a, b) => {
    switch (prop) {
    case "release_date":
        a = new Date(a[prop])
        b = new Date(b[prop])

        if (order === "desc") return b > a
        return b < a
    case "height":
        a = parseInt(a[prop])
        b = parseInt(b[prop])
    
        if (order === "desc") {
            if (isNaN(a)) a = Number.NEGATIVE_INFINITY
            if (isNaN(b)) b = Number.NEGATIVE_INFINITY
            return b - a
        }

        if (isNaN(a)) a = Number.POSITIVE_INFINITY
        if (isNaN(b)) b = Number.POSITIVE_INFINITY
        return a - b
    default:
        a = a[prop].toString().replace(/\s+/g,"").toLowerCase()
        b = b[prop].toString().replace(/\s+/g,"").toLowerCase()
        
        if (order === "desc") return b.localeCompare(a)
        return a.localeCompare(b)
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
    const data = await getDataFromRedis(type)
    if (!data) return await fetchAndSaveDataToRedis(type)
    const response = JSON.parse(data)
    return response
}

const fetchAndSaveDataToRedis = async (type) => {
    const data = await fetchPaginatedData(type)
    const response = JSON.stringify(data)
    await saveDataToRedis(type, response)
    return JSON.parse(response)
}

const checkDataExists = async (type, param, id) => {
    const data = await retrieveData(type)
    const response = data.filter(filterBy(param, id))
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
    checkDataExists,
    fetchAndSaveDataToRedis,
    retrieveData,
    fetchPaginatedData,
    sortResponse,
    filterBy,
    validate,
    fetchDataFromSwapi
}