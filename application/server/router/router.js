const express = require("express");
const usersroute = require("./users/users");

//main router
const router = new express.Router();

//route for users
router.use("/users",usersroute);


//export router for middleware
module.exports = router;