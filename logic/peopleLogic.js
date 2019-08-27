exports.insertMetaData = (people = []) => {
    const response = {}
    let cm = 0, ft= 0, inches = 0

    people.forEach((person) => {
        let _cm = parseInt(person.height)

        if (!isNaN(_cm)) {
            cm = cm + _cm
            ft = ft + Math.ceil(parseFloat((_cm / 30.48).toFixed(2)))
            inches = inches + parseFloat((_cm / 2.54).toFixed(2))
        }
    })

    response["count"] = people.length
    response["totalHeight(Cm)"] = cm
    response["totalHeight(Ft)"] = ft
    response["totalHeight(In)"] = inches
    response["results"] = people

    return response
}

exports.extractCharacterIds = (films, id) => {
    let film = films.filter((obj) => {
        return obj.episode_id === parseInt(id)
    })
    
    let ids = film[0]["characters"].map((char) => {
        char = char.toString()
        return char.match(/\d+/g)[0]
    })

    return ids
}


exports.getCharacters = (all_people, charcter_ids = []) => {
    let response = all_people.filter((person) => {
        return charcter_ids.includes(person["url"].toString().match(/\d+/g)[0]) 
    })

    return response
}