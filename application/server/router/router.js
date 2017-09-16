const express = require("express");
const usersroute = require("./users/users");
const postsroute = require("./posts/posts");
const commentsroute = require("./comments/comments");
const graphqlroute = require("./graphql/graphql");

//main router
const router = new express.Router();

//route for users
router.use("/users",usersroute);

//route for posts
router.use("/posts",postsroute);

//route for comments
router.use("/comments",commentsroute);

//route for graphql
router.use("/graphql", graphqlroute);


//export router for middleware
module.exports = router;