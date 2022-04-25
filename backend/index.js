import express from "express";
import chalk from "chalk";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const USERS = [];
const TWEETS = [];
const TWEETSPERPAGE = 10;

app.post('/sign-up', (req, res)=>{
    const userInfo = req.body;
    if(userInfo.username.length === 0 && userInfo.avatar.length === 0) {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        USERS.push(userInfo);
        res.send("ok");
    }
});

app.post('/tweets', (req, res)=> {
    let tweet = req.body;

    USERS.forEach(user=>{
        if (user.username === tweet.username) {
            tweet = {...tweet, avatar: user.avatar};
        }
    })

    TWEETS.splice(0,0,tweet);
    res.send("ok");
});

app.get('/tweets', (req, res)=>{
    const visibleTweets = []
    if(TWEETS.length < 10) {
        res.send(TWEETS);
    } else {
        for(let i = 0; i < TWEETSPERPAGE; i++) {
            visibleTweets.push(TWEETS[i]);
        }
        res.send(visibleTweets);
    }
    
});

app.listen(5000, ()=>{
    console.log(chalk.bold.green("Servidor em pé na porta 5000!"))
})