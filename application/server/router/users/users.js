const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../../config/server.config");



const usersroute = new express.Router();

//gets all users
usersroute.get("/",function(req,res){

    //get only username and created fields
    User.find(null,"username created deleted _redditposts _comments",function(err,users){

        //server err
        if(err){
            res.status(500).send(err);
            return;
        }

        //users found
        var resObject = {
            msg: "Success",
            data: users
        };

        res.status(200).send(resObject);

    });
});

//create a new user
usersroute.post("/register",function(req,res){

    //res body
    let resBody = {};

    //there was no user info provided
    if(!req.body){
        resBody.msg = "No user information was provided";
        res.status(400).send(resBody);
        return;
    }

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function(err,user){
        //err saving user
        if(err){
            resBody.msg = "Error saving user to the database";
            resBody.data = err;
            res.status(500).send(resBody);
            return;
        }

        //send success alongside user
        resBody.msg = "Success";
        resBody.data = user;
        res.status(200).send(resBody);
    });

});


// login
usersroute.post("/login",function(req,res){
    //res body object
    var resBody = {};

    //if no info provided
    if(!req.body || !req.body.username || !req.body.password){
        resBody.msg = "No user information provided.";
        res.status(400).send(resBody);
        return;
    }

    //info provided
    User.findOne({
        username: req.body.username
    },
    function(err,user){
        //if server err
        if(err){
            resBody.msg = "Server error trying logging in.";
            resBody.data = err;
            res.status(500).send(resBody);
            return;
        }

        //no err
        user.checkPassword(req.body.password,function(err,user){
            //invalid pwd
            if(err){
                resBody.msg = "Wrong password";
                resBody.data = err;
                res.status(400).send(resBody);
                return;
            }

            //generate jwt
            jsonwebtoken.sign({
                id:user._id
            }, config.jwt.secret, {
                expiresIn: "10h"
            }, (err, token) => {

                if (err) {
                    //err sign jwt
                    resBody.msg = "Error generating JWT.";
                    resBody.data = err;
                    res.status(400).send(resBody);
                    return;
                }

                //valid login
                resBody.msg = "Success";
                resBody.data = user;
                resBody.jwt = token;
                res.status(200).send(resBody);
            });
        });
    });
});

module.exports = usersroute;