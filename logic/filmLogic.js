const Films = require("../models").Film

exports.attachCommentsCount = (films, metadata) => {
    const comments_data = JSON.stringify(metadata)
    const film_data = JSON.parse(comments_data)
    
    films.forEach((film) => {
        film["comment_count"] = 0
        if (film_data.length > 0) {
            film_data.forEach((data) => {
                if (data.film_id === film.episode_id) {
                    console.log(data)
                    film["comment_count"] = data.comment_count
                }
            })
        } else {
            film["comment_count"] = 0
        }
    })

    return films
}

exports.addFilmToDatabase = async(id) => {
    const response = await Films.findOrCreate({
        where: { id }
    })

    return response[0]
}