"use strict"
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        film_id: DataTypes.INTEGER,
        user_id: DataTypes.STRING,
        comment: DataTypes.STRING(500)
    }, {})
    
    return Comment
}