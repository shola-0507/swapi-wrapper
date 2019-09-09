exports.getMetaData = (people = []) => {
    const metaData = {}
    let cm = 0

    people.forEach((person) => {
        let _cm = parseInt(person.height)
        if (!isNaN(_cm)) cm = cm + _cm
    })

    const total_height_in_inches = parseFloat(((cm / 30.48) * 12))
    const ft = Math.floor(parseFloat(total_height_in_inches / 12))
    const inches = parseFloat((total_height_in_inches % 12)).toFixed(2)

    metaData["totalHeight(Cm)"] = cm
    metaData["totalHeight(Ft/In)"] = `${ft}ft and ${inches}inches`

    return metaData
}

exports.extractCharacterIds = (films, id) => {
    let ids= []
    const film = films.filter((obj) => {
        return obj.episode_id === parseInt(id)
    })
    
    if (film.length) {
        ids = film[0]["characters"].map((char) => {
            char = char.toString()
            return char.match(/\d+/g)[0]
        })
    }

    return ids
}

exports.getCharacters = (all_people, charcter_ids = []) => {
    const response = all_people.filter((person) => {
        return charcter_ids.includes(person["url"].toString().match(/\d+/g)[0]) 
    })

    return response
}