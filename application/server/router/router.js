const express = require("express");
const usersroute = require("./users/users");
const postsroute = require("./posts/posts");
const commentsroute = require("./comments/comments");

//main router
const router = new express.Router();

//route for users
router.use("/users",usersroute);

//route for posts
router.use("/posts",postsroute);

//route for comments
router.use("/comments",commentsroute);


//export router for middleware
module.exports = router;