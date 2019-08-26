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
    switch (prop) {
    case "release_date":
        a = new Date(a[prop])
        b = new Date(b[prop])

        if (order === "desc") return b > a
        return b < a
    case "height":
        a = parseInt(a[prop])
        b = parseInt(b[prop])
        
        if (isNaN(a)) a = Number.POSITIVE_INFINITY
        if (isNaN(b)) b = Number.POSITIVE_INFINITY

        if (order === "desc") {
            return a - b
        }
        return b - a
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

const checkDataExists = async (type, param, id) => {
    let data = await retrieveData(type)
    data = JSON.parse(data)
    
    data = filter(data, param, id)
    return data
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
    filter,
    validate,
    fetchDataFromSwapi
}