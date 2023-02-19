const express = require("express");
const session = require('express-session');
const users = require("./routeusers.js");
const messages = require("./routemessages.js");
const followers = require("./routefollowers.js");
const likes = require("./routelikes.js");
const auth = require("./routeauth.js");
const db = require("./db.js");
const cookie = require("cookie-parser");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());
app.use(cookie());
app.use("/api/social", users);
app.use("/api/social", messages);
app.use("/api/social", followers);
app.use("/api/social", likes);
app.use("/api/auth", auth);

app.listen(3000, async () => {
    console.log("Server avviato");
    await db.connect();
    console.log("Connesso a MongoDB")
});

