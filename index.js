import express from "express";
import cors from "cors";
import users from "./users.js";
import tweets from "./tweets.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body

    const newUser = {
        username,
        avatar
    };
    users.push(newUser);

    res.sendStatus(200)
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    tweets.unshift({
        username,
        tweet
    });

    res.sendStatus(200)
})

app.get("/tweets", (req, res) => {
    const limit = parseInt(req.query.limit)
    const newTweets = tweets.map( t => {
        const avatar = users.find(u => u.username === t.username)
        t.avatar = avatar.avatar;
        return t;
    })
    if(newTweets.length > limit){
        newTweets.length = limit;
    }
    res.send(newTweets)
})


app.listen(5000)