const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./db.js");


router.get("/messages", async (req, res) => {
    const mongo = db.getDB();
    let messages = await mongo.collection("messages").find().toArray();
    res.json(messages);
});


router.get("/messages/:userId", async (req, res) => { 
    const mongo = db.getDB();
    const userId = req.params.userId;
    let messages = await mongo.collection("messages").find({ user: userId }).toArray();
    res.json(messages);
});


router.get("/messages/:userId/:idMsg", async (req, res) => { 
    const mongo = db.getDB();
    const idMsg = parseInt(req.params.idMsg);
    const userId = req.params.userId;
    let message = await mongo.collection("messages").findOne({ _id: idMsg, user: userId });
    res.json(message);
});


router.post("/messages", async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret_key');
        const mongo = db.getDB();
        const user = await mongo.collection("users").findOne({username: decoded.id });
        const text = req.body.text;
        console.log(text);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        const message = {
            date: dateTime,
            text: text,
            user: decoded.id,
        };
        const last = await mongo.collection("messages").findOne({}, { sort: { _id: -1 } });
        let lastId = last?._id === undefined ? 0 : last._id;
        lastId++;
        message._id = lastId;
        await mongo.collection("messages").insertOne(message);
        res.json(message);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'HTTP internal server error' });
    }
});


const { ObjectId } = require('mongodb');

router.get("/feed", async (req, res) =>{
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret_key');
        const mongo = db.getDB();
        const user = await mongo.collection("users").findOne({username: decoded.id});
        const followed = await mongo.collection("followers").find({follower: user.username}).toArray();
        console.log(followed);
        let followedMessages = new Set();
        for(i of followed) {
            let followedMessage = await mongo.collection("messages").find({user: i.followed}).toArray();
            console.log(followedMessage);
            followedMessage.forEach(message => {
                const foundMessage = Array.from(followedMessages).find(msg => msg._id.toString() === message._id.toString());
                if (!foundMessage) {
                    followedMessages.add(message);
                }
            });
        }      
        res.json(Array.from(followedMessages));
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'HTTP internal server error'});
    }
});



module.exports = router;