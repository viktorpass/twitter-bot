const Sequelize = require('sequelize');
require('dotenv').config();
let username = process.env.USERNAME;
let password = process.env.PASSWORD;



const connection = new Sequelize(process.env.DATABASE,process.env.USERNAME_DB,process.env.PASSWORD_DB,{
    host:'us-cdbr-east-06.cleardb.net',
    dialect:'mysql'

});



module.exports = connection
