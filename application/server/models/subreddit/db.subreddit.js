const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//subreddit schema
const subredditSchema = new Schema({
    title:{
        type: String,
        required:[true, "Subreddit title is required!"],
        match:[/[a-zA-Z0-9_]/,"Valid characters for subreddit titles are: a-Z, 0-9, _ !"]
    },
    created: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false,
        required: true
    },
    locked: { // non subscribers / moderators cant post
        type: Boolean,
        default: false,
        required: true

    },
    _admin:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    _moderators:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    subscribersNum:{
        type: Number,
        default: 0, 
        required: true
    },
    _subscribers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    postsNum: { // number of posts
        type: Number,
        default: 0,
        required: true
    },
    _posts:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    ]

});

//export subreddit schema
module.exports = subredditSchema;