const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./db.js");


router.get("/like/:idMsg", async (req, res) => {
    const mongo = db.getDB();
    const idMsg = parseInt(req.params.idMsg);
    const likedMsgs = await mongo.collection("likes").find({ id_message: idMsg }).toArray();
    const number = parseInt(likedMsgs.length);
    res.json(number);
      
})


router.get("/like/isLiked/:idMsg", async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, "secret_key");
        const mongo = db.getDB();
        const idMsg = parseInt(req.params.idMsg);
        if (!idMsg) {
        return res.status(404).send({ error: "Invalid message ID" });
        }
        const currentUser = decoded.id;
        let likes = await mongo.collection("likes").find({user: currentUser}).toArray();
        const isLiked = likes.some(like => like.user === currentUser && like.id_message === idMsg);
        res.json({isLiked});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "HTTP internal server error" });
    }
});



router.post("/like/:idMsg", async (req, res) => { 
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret_key');
        const mongo = db.getDB();
        const user = await mongo.collection("users").findOne({ username: decoded.id });
        const idMsg = parseInt(req.params.idMsg);
        console.log(req.params);
        const message = await mongo.collection("messages").findOne({ _id: idMsg });
        //console.log(message);
        let likes = await mongo.collection("likes").find().toArray();
        if(!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        else if(!message) {
            return res.status(404).json({ error: 'Not found' });
        }
        else{

            if(user.username === likes.user && message._id === likes.id_message){
                return res.status(409).json({ error: 'Like on this messages already exists.' });
            }

            else{

                const like = {
                    "user": user.username,
                    "id_message": idMsg
                };
        
                const last = await mongo.collection("likes").findOne({}, { sort: { _id: -1 } });
                let lastId = last?._id === undefined ? 0 : last._id;
                lastId++;
                console.log(lastId);
                like._id = lastId;
                let likes = await mongo.collection("likes").insertOne(like);
                res.json(likes); 
            }
        }
    } catch (err) {
        return res.status(500).json({ error: 'HTTP internal server error' });
    }
});


router.delete("/like/:idMsg", async (req, res) => { 
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret_key');
        const mongo = db.getDB();
        const user = await mongo.collection("users").findOne({ username: decoded.id });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        idMsg = parseInt(req.params.idMsg);
        const like = await mongo.collection("likes").findOne({"user": user.username, "id_message": idMsg});
        if (!like) {
            return res.status(404).json({ error: 'Not found' });
        }
        let likes = await mongo.collection("likes").deleteOne(like);
        res.json(likes);
    } catch (err) {
        return res.status(500).json({ error: 'HTTP internal server error' });
    }
});

module.exports = router;