"use strict"
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        film_id: DataTypes.INTEGER,
        user_id: DataTypes.STRING,
        comment: DataTypes.STRING(500)
    }, {})
    
    Comment.associate = function(models) {
        Comment.belongsTo(models.Film, {
            foreignKey: "film_id",
            onDELETE: "CASCADE"
        })
    }
    return Comment
}