// --- imported modules --- //
const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router;
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const passport = require("passport");

// create post router
const postRouter = new Router();

//get posts
postRouter.get("/", passport.authenticate("jwt",{ session:false }), function(req,res){
    //res body object
    let resBody = {};
    Post.find(function(err,posts){
        //if err
        if(err){
            resBody.msg = "Error getting posts.";
            resBody.data = err;
            res.status(500).send(resBody);
            return;
        }
        //no err
        resBody.msg = "Success";
        resBody.data = posts;
        res.status(200).send(resBody);
    });
});

//post post - create new
postRouter.post("/",function(req,res){
    //resbody
    let resBody = {};

    //no req data 400 err
    if(!req.body){
        resBody.msg = "No post data!";
        resBody.data = [];
        res.status(400).send(resBody);
        return;
    }

    //create post model
    let postDb = new Post({
        title: req.body.title,
        content: req.body.content,
        _userId: req.body._userId
    });

    //try to save
    postDb.save(function(err,post){
        //if err
        if(err){
            resBody.msg = "Error saving post to the Db!";
            resBody.data = err;
            res.status(500).send(resBody);
            return;
        }

        //else
        //save post to user posts
        User.findByIdAndUpdate(
            post._userId,
            {
                $push: { "_redditposts": post._id }
            },
            function(err){
                //if err
                if(err){
                    resBody.msg = "Error updating user schema with post id!";
                    resBody.data = err;
                    res.status(500).send(resBody);
                    return;
                }
                //add user data
                Post.findById(post._id).populate({
                    path:"_userId",
                    select: "username email created"
                }).exec(function(err,post){

                    if(err){
                        resBody.msg = "Saving successful, but error retrieving new data!";
                        resBody.data = err;
                        res.status(202).send(resBody);
                        return;
                    }

                    //return post with userdata
                    resBody.msg = "Success!";
                    resBody.data = post;
                    res.status(200).send(resBody);
                });

            }
        );

    });
});


//export posts router
module.exports = postRouter;




