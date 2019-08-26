"use strict"
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Films", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            comment_count: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
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
        return queryInterface.dropTable("Films")
    }
}