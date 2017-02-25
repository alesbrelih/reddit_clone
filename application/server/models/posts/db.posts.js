// -- needed modules -- //
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const PostSchema = new Schema({
    title: {
        trim: true, // trim inserted
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        trim: true, //trim inserted
        minlength:[10, "The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH})."] //min 10 chars in psot
    },
    votes: {
        type: Number,
        default: 0,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
        required: true
    },
    _userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    _commentsIds: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ]
});


//extra prefind for user info
PostSchema.pre("find", function(next){

    //ref to current obj
    const self = this;
    self.populate({ //populate foreign key
        path:"_userId",
        select:"username email"
    });
    next(); //go next because parallel
});

PostSchema.pre("find", function(next){

    //ref to current obj
    const self = this;
    self.populate({
        path:"_commentsIds",
        select:"content created edited"
    });
    next(); //go next because parallel
});


//export schema for middleware
module.exports = PostSchema;