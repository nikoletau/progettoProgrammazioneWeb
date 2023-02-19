const express = require("express");
const session = require('express-session');
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./db.js");


router.post("/signup", async (req, res) => {
  const mongo = db.getDB();
  const user = req.body;
  console.log(req.body);
  const username = req.body.username;
  const userDB = await mongo.collection("users").findOne({username:username});
  if(user.username && user.password && user.name && user.surname && user.birth_date && user.location && user.bio) {
      
    if(userDB){
      return res.status(409).json({message: "User Already Exist. Please Login"});
    }
    else{
      const last = await mongo.collection("users").findOne({}, { sort: { _id: -1 } });
      let lastId = last?._id === undefined ? 0 : last._id;
      lastId++;
      user._id = lastId;        
      let users = await mongo.collection("users").insertOne(user);
      res.status(200).json({message: 'Sign up completed successfully'});
    }  
  } else {
    res.status(400).json({message: "All the fields has to be filled in"});
  }
});
  


router.post("/signin", async (req, res) => { 
  try {
      const mongo = db.getDB();
      const username = req.body.username;
      const password = req.body.password;
      const user = await mongo.collection("users").findOne({username:username});
      if(!user){
          res.status(401).json({message: 'No such username was found.'});
      }
      else if(user.username!== username || user.password !== password) {
          res.status(401).json({message: 'Invalid credentials'});
          
      } else {
          const token = jwt.sign({id: user.username}, 'secret_key',{
              expiresIn: 86400 
          });
          res.cookie('jwt', token, {httpOnly: true});
          res.status(200).json({message: 'Authenticated'});
      } 
  } catch(err) {
      res.status(500).json({error: "HTTP internal server error"});
  }    
});


router.get("/check-auth", async (req, res) => { 
  try {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).json({message: 'Not authenticated'});
    } else {
        const decoded = jwt.verify(token, 'secret_key');
        res.json({message: 'Authenticated', username: decoded.id});
    }
  } catch (err) {
      res.status(401).json({message: 'Not authenticated'});
  }
});


router.post('/signout', async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({message: 'Not authenticated'});
    } else {
      const decoded = jwt.verify(token, 'secret_key');
      const userId = decoded.id;
      req.session.destroy(err => {
        if (err) {
          console.error(err);
          res.status(500).json({message: 'Failed to log out'});
        } else {
          res.clearCookie('jwt');
          res.status(200).json({message: 'You have been logged out'});
        }
      });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({message: 'Failed to log out'});
  }
});




module.exports = router;