const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./db.js");


router.get("/followers/:user", async (req, res) => { 
    const mongo = db.getDB();
    const user = req.params.user;
    let followers = await mongo.collection("followers").find({followed: user}).toArray();
    res.json(followers);
});


router.get("/followers/isFollowed/:user", async (req, res) => {
    try {
        const mongo = db.getDB();
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, "secret_key");
        const currentUser = decoded.id;
        if (!currentUser) {
        return res.status(401).json({ error: "Unauthorized" });
        }
        const user = req.params.user;
        console.log(user);
        if (!user) {
        return res.status(404).send({ error: "Invalid user ID" });
        }
        let followers = await mongo.collection("followers").find({followed: user}).toArray();
        const isFollowed = followers.some(follower => follower.follower === currentUser && follower.followed === user);
        res.json({isFollowed});
    } catch (err) {
        res.json({ message: "HTTP internal server error" });
    }
  });



router.post("/followers/:id", async(req, res) => {
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret_key');
        const mongo = db.getDB();
        const followedId = req.params.id;
        const user = await mongo.collection("users").findOne({username: decoded.id});
        
        const followed = await mongo.collection("followers").findOne({followed: followedId});
        console.log(user);
        if (!user) {
            return res.status(401).json({error: 'Unauthorized'});
        }else{

            //Inizialmente si pensava di creare un pulsante per Follow e uno per Unfollow e gestire come scritto sucessivamente
            //alla fine si è deciso di creare un unico pulsante sia per Follow che Unfollow, quindi il prossimo blocco di codice
            //rimane commentato
        
            /* const followed = await mongo.collection("users").findOne({username: req.params.id});
            if (!followed) {
                return res.status(404).json({error: 'Not found'});
            }
            const existingFollow = await mongo.collection("followers").findOne({follower: user.username, followed: followed.username});
            console.log(existingFollow);    
            if (existingFollow) {
                return res.status(400).json({error: 'You are already following this user'});
            } */
            
            const follow = {
                "follower": user.username,
                "followed": followedId
            };
            const last = await mongo.collection("followers").findOne({}, {sort: {_id: -1}});
            let lastId = last ? last._id : 0;
            lastId++;
            follow._id = lastId;
            let followers = await mongo.collection("followers").insertOne(follow);
            res.json(followers);
        }
    } catch (err) {
        return res.status(500).json({error: 'HTTP internal server error'});
    }
});


router.delete("/followers/:id", async(req, res) => { 
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret_key');
        const mongo = db.getDB();
        const user = await mongo.collection("users").findOne({username: decoded.id});
        const followedId = req.params.id;
        const followed = await mongo.collection("followers").findOne({followed: followedId, follower: user.username});
        //Inizialmente si pensava di creare un pulsante per Follow e uno per Unfollow e gestire come scritto sucessivamente
            //alla fine si è deciso di creare un unico pulsante sia per Follow che Unfollow, quindi il prossimo blocco di codice
            //rimane commentato
        /*if(!user) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        
        console.log(followed);
        if(!followed) {
            return res.status(404).json({error: 'Not found'});
        }
        const existingFollow = await mongo.collection("followers").findOne({follower: user.username, followed: followed.username});
         
        if (!existingFollow) {
            return res.status(400).json({error: 'You already unfollowed this user'});
        } */
        let followers = await mongo.collection("followers").deleteOne(followed);
        res.json(followers);  
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'HTTP internal server error'});
    }
});


module.exports = router;