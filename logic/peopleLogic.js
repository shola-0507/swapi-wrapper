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