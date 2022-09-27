const { response } = require('express');
const twit = require('twit');
const connection = require('./connection');
require('dotenv').config();
const quotes = require("./quotes");
const shortId = require('shortid');
const quotesDB = require('./db');
const schedule = require('node-schedule')
const botRetweet = require('./retweet');

connection.authenticate().then(()=>{
    console.log("Database connected");
}).catch((error)=>{
    console.log(error);
})

const Tweet = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret:process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:60000
})


function returnQuote(){
    quotesDB.findAndCountAll().then((res)=>{
        let randomID = Math.floor(Math.random() * res.count);
         quotesDB.findOne({where:{id:randomID}}).then((res)=>{
            if(!res.posted){
                 let quote = (`${res.quote}\n\n-${res.author}`);
                Tweet.post('statuses/update',{status:quote},(error,data,response)=>{
                    console.log("Post Successfully " + data);
                    res.posted = true;
                    res.save();
                })
            }else{
                console.log("Already been posted");
            }
        }).catch((error)=>{
            console.log(error)
        })
    }).catch((error)=>{
        console.log(error);
    })
    
}



const job = schedule.scheduleJob('0 0 10 1/1 * ? *', () => {
    returnQuote();
});

setInterval(()=>{botRetweet},1000);