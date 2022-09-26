const Sequelize = require('sequelize');
const connection = require('./connection');

const Quotes = connection.define('quotes',{
    _id:{
        type:Sequelize.STRING
    },
    quote:{
        type:Sequelize.STRING,
        allowNull:false
    },
    author:{
        type:Sequelize.STRING,
        allowNull:false
    },
    posted:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }

})
Quotes.sync({force:false});

module.exports = Quotes