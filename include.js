const quotes = require("./quotes");
const shortId = require('shortid');
const quotesDB = require('./db')

quotes.forEach((content,index,array)=>{
    let id = shortId.generate();
    let quote = content.quote
    let author = content.author
    
    quotesDB.create({
        _id:id,
        quote:quote,
        author:author

    }).then(()=>{
        console.log("OK")
    }).catch((error)=>{
        console.log(error)
    })
    
})