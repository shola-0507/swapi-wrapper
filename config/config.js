require("dotenv").config()

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB,
        pool: {
            max: 10,
            min: 2,
            idle: 300000
        }
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB,
        pool: {
            max: 10,
            min: 2,
            idle: 300000
        }
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB,
        "dialectOptions":{
            "ssl":{
                "require": process.env.DB_SSL_REQUIRED
            }
        },
        pool: {
            max: 10,
            min: 2,
            idle: 30000
        }
    }
}
