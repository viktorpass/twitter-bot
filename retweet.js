const twit = require('twit');
const Tweet = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret:process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:60000
})

function botInit(){
    let query = {
        q:"frase do dia",
        result_type: "recent"
        
    };
    Tweet.get('search/tweets',query, BotGotLatestTweet);

    function BotGotLatestTweet(error,data,response){
        if(error){
            console.log("Bot cant find the recent tweets - " + error);
        }else{
            let id = {
                id:data.statuses[0].id_str,
            }
            Tweet.post("statuses/retweet/:id",id,function(error,response){
                if(error){
                    console.log("Can't retweet - " + error);
                }else{
                    console.log("Retweet successfully - " + id.id);
                }
            })
        }
        
    }
    

}
module.exports = botInit();