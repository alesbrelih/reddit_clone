// --- IMPORT MODULES --- //

const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router;
const CommentDb = mongoose.model("Comment");
const UserDb = mongoose.model("User");
const PostDb = mongoose.model("Post");
// comment router
const commentRouter = new Router();

//get comments
commentRouter.get("/",function(req,res){
    //resbody
    const resBody = {};
    CommentDb.find(function(err,comments){
        //err getting from db
        if(err){
            resBody.msg = "Error retrieving comments from db!";
            resBody.data = err;
            res.status(500).send(resBody);
            return;
        }
        //success
        resBody.msg = "Success";
        resBody.data = comments;
        res.status(200).send(resBody);
    });
});

commentRouter.post("/",function(req,res){

    //res body
    const resBody = {};

    //no data in body
    if(!req.body){
        resBody.msg = "No comment information provided!";
        resBody.data = [];
        res.status(400).send(resBody);
        return;
    }

    //data exists!
    const commentModel = new CommentDb({
        content:req.body.content,
        _userId: req.body._userId,
        _postId: req.body._postId
    });

    commentModel.save(function(err,comment){

        //update user promise
        const updateUserPromise = new Promise(function(resolve,reject){
            UserDb.findByIdAndUpdate(
            comment._userId,
                {
                    $push:{
                        "_commentsIds":comment._id
                    }
                },
            function(err){
                if(err){
                    reject(err);
                }
                resolve(); //success
            }
        );
        });

        //update post promise
        const updatePostPromise = new Promise(function(resolve,reject){
            PostDb.findByIdAndUpdate(
            comment._postId,
                {
                    $push: {
                        "_commentsIds":comment._id
                    }
                },
            function(err){
                if(err){
                    reject(err);
                }
                resolve();
            }
        );
        });
        Promise.all([updateUserPromise,updatePostPromise]).then(function(){
            CommentDb.findById(comment._id,function(err,commentDb){

                if(err){
                    resBody.msg = "Comment saved, but error retrieving new data.";
                    resBody.data = err;
                    res.status(202).send(resBody);
                    return;
                }

                UserDb.populate(commentDb,{
                    path: "_userId",
                    select: "username email"
                },function(err,comment){

                    PostDb.populate(comment,{
                        path: "_postId",
                        select: "title content created"
                    },function(err,comment){
                        //success
                        resBody.msg = "Success";
                        resBody.data = comment;
                        res.status(200).send(resBody);
                    });
                });




            });
            // .populate({
            //     path:"_postId _userId"
            // }).exec(function(err,commentDb){
            //     //err retrieving new data
            //     if(err){
            //         resBody.msg = "Comment saved, but error retrieving new data.";
            //         resBody.data = err;
            //         res.status(202).send(resBody);
            //         return;
            //     }

            //     //success
            //     resBody.msg = "Success";
            //     resBody.data = commentDb;
            //     res.status(200).send(commentDb);
            // });
        })
        .catch(function(err){
            if(err){
                resBody.msg = "Error saving comment to the database!";
                resBody.data = err;
                res.status(500).send(resBody);
                return;
            }
        });

    });

});

module.exports = commentRouter;


