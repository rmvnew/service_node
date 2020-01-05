const Sequelize = require("sequelize")

const connection = new Sequelize('guiaperguntas','itbam','12345',{
    host:'localhost',
    dialect: 'mysql'
})

module.exports = connection;