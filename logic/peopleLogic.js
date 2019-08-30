exports.getMetaData = (people = []) => {
    const metaData = {}
    let cm = 0, ft= 0, inches = 0

    people.forEach((person) => {
        let _cm = parseInt(person.height)

        if (!isNaN(_cm)) {
            cm = cm + _cm
            ft = ft + Math.ceil(parseFloat((_cm / 30.48).toFixed(2)))
            inches = inches + parseFloat((_cm / 2.54).toFixed(2))
        }
    })

    metaData["totalHeight(Cm)"] = cm
    metaData["totalHeight(Ft)"] = ft
    metaData["totalHeight(In)"] = inches

    return metaData
}

exports.extractCharacterIds = (films, id) => {
    let ids= []
    
    if (films.length) {
        ids = films[id]["characters"].map((char) => {
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