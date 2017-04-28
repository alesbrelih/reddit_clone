
//---- all models and config file
const mongoose = require("mongoose");
const config = require("../config/server.config");
const userSchema = require("./users/db.users");
const postSchema = require("./posts/db.posts");
const commentSchema = require("./comments/db.comments");

const subredditHeader = require("./subreddit/subreddit_header/db.subreddit.header");
const subreddit = require("./subreddit/db.subreddit");

//deprecated resolve
mongoose.Promise = global.Promise;

// connect to db
mongoose.connect(config.mongo.connection());

//register user schema
mongoose.model("User",userSchema);

//register post schema
mongoose.model("Post",postSchema);

//register comment schema
mongoose.model("Comment",commentSchema);

// --- subredit section --- //

//register subredit header
mongoose.model("SubredditHeader", subredditHeader);

//register subreddit
mongoose.model("Subreddit", subreddit);

// ------------------------ //

