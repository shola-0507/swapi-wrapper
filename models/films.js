"use strict"

module.exports = (sequelize, DataTypes) => {
    const Film = sequelize.define("Film", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        comment_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {})
    
    Film.associate = function(models) {
        Film.hasMany(models.Comment, {
            foreignKey: "film_id",
            as: "comments"
        })
    }
    return Film
}