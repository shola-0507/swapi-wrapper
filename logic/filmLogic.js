exports.extractFields = (films, fields= []) => {
    const data = []
    
    films.forEach((film) => {
        const new_obj = {}
        fields.forEach((field) => {
            new_obj[field] = film[field]
        })
        data.push(new_obj)
    })

    return data
}

exports.attachCommentsCount = (films, film_data) => {
    films.forEach((film) => {
        film["comment_count"] = 0
        if (film_data.length > 0) {
            film_data.forEach((data) => {
                if (data.id === film.episode_id) {
                    film["comment_count"] = data.comment_count
                }
            })
        } else {
            film["comment_count"] = 0
        }
    })

    return films
}