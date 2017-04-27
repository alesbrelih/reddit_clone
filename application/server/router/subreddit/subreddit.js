// -- needed modules -- //

const express = require("express");
const mongoose = require("mongoose");
const Subheader = mongoose.model("SubredditHeader");
const Subreddit = mongoose.model("Subreddit");

// -------------------- //

const subredditroute = new express.Router();

//routes

//get all
subredditroute.get("/",function(req,res){

    //get all
    Subreddit.find(function(err,subreddits){
        //if err
        if(err){
            res.status(500).send(err);
            return;
        }

         //subreddits found
        var resObject = {
            msg: "Success",
            data: subreddits
        };

        res.status(200).send(resObject);



    });
});



//export router
module.exports = subredditroute;


