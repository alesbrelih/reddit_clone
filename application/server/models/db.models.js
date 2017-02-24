
// ---- all models and config file
const mongoose = require("mongoose");
const config = require("../config/server.config");
const userSchema = require("./users/db.users");

// connect to db
mongoose.connect(config.mongo.connection());

//register user schema
mongoose.model("User",userSchema);
