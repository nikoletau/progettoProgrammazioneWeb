const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("./db.js");

router.get("/users", async (req,res) => { 
    const mongo = db.getDB();
    let users = await mongo.collection("users").find().toArray();
    res.json(users);
});

router.get("/users/:id", async (req, res) => { 
    const mongo = db.getDB();
    const userId = req.params.id;
    let user = await mongo.collection("users").findOne({username: userId});
    res.json(user);
});


router.get("/search", async (req, res) => {
    try {
        const mongo = db.getDB();
        const query = req.query.q;
        const users = await mongo.collection("users").aggregate([
                {
                    $project: {
                        _id: 1,
                        username: 1,
                        name: 1,
                        surname: 1,
                        birth_date: 1,
                        location: 1,
                        bio: 1
                    }
                },
                {
                    $match: {
                        $or: [
                            {"_id": {$regex: query, $options: 'i'}},
                            {"username":{$regex: query, $options: 'i'}}, 
                            {"name": {$regex: query, $options: 'i'}},
                            {"surname": {$regex: query, $options: 'i'}},
                            {"birth_date": {$regex: query, $options: 'i'}},
                            {"location": {$regex: query, $options: 'i'}},
                            {"bio": {$regex: query, $options: 'i'}}
                        ]
                    }
                }
            ]).toArray();
            res.json(users);
            console.log(users);
    } catch (err) {
        
        res.status(500).send({error: 'HTTP internal error'});
    }
});

router.get("/whoami", async (req, res) => {  
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secret_key');
        const mongo = db.getDB();
        const user = await mongo.collection("users").findOne({username: decoded.id});
        console.log(user);
        if(!user) {
            return res.status(401).json({error:'Unauthorized'});
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'HTTP internal server error'});
    }
});


module.exports = router;