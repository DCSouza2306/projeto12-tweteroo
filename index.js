import express from "express";
import cors from "cors";
import users from "./users.js";
import tweets from "./tweets.js";

const app = express();

app.use(express.json());
app.use(cors())

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body
    const newUser = {
        username,
        avatar
    };
    users.push(newUser)

    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    tweets.unshift({
        username,
        tweet
    });

    res.send("OK")
})

app.get("/tweets", (req, res) => {
    const limit = parseInt(req.query.limit)
    const newTweets = tweets.map( e => {
        const avatar = users.find(u => u.username === e.username)
        e.avatar = avatar.avatar;
        return e;
    })
    res.send(newTweets)
})


app.listen(5000)