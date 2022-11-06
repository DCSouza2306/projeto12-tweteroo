import express from "express";
import cors from "cors";
import users from "./users.js";
import tweets from "./tweets.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body

    if(username === "" || avatar === ""){
        res.status(400).send("Preencha todos os campos");
        return;
    }

    const userConference = users.find(u => u.username === username);
    if(userConference){
        res.status(409).send("Usuario já cadastrado, insira outro nome");
        return;
    }
    const newUser = {
        username,
        avatar
    };
    users.push(newUser);

    res.sendStatus(200)
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    if(tweet === ""){
        res.status(400).send("Campo de tweet não pode estar vazio");
        return;
    }

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