const Sequelize = require('sequelize');

const connection = new Sequelize('heroku_205453c775958bd','ba2b9893575e8e','79d8a46c',{
    host:'us-cdbr-east-06.cleardb.net',
    dialect:'mysql'

});



module.exports = connection


