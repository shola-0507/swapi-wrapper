"use strict"
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Comments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            film_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                references: {
                    model: "Films",
                    key: "id",
                    as: "film_id"
                }
            },
            user_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            comment: {
                allowNull: false,
                type: Sequelize.STRING(500)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Comments")
    }
}