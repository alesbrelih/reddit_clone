// -- modules -- //
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema(
    {
        created: { //create date
            type: Date,
            default: Date.now
        },
        edited: { //edit date
            type: Date,
        },
        content: { //content
            type: String,
            required: true,
            minlength:[0, "The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH})."]
        },
        votes:{ // votes / downvotes
            type: Number,
            default: 0,
            required: true
        },
        deleted:{ //deleted flag
            type: Boolean,
            default: false,
            required: true
        },
        _userId: { //user id fk
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "User id is required!"]
        },
        _postId: { //post fk
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            required: [true, "Post id is required!"]
        }
    }
);

// --- POPULATE FUNCTIONS --- //

//populate user info
function populateUser(next){

    //comment obj ref
    const self = this;

    self.populate({
        path:"_userId",
        select:"username"
    });

    next();
}

//populate post info
function populatePost(next){

    //comment obj ref
    const self = this;

    self.populate({
        path:"_postId",
        select:"title created edited votes"
    });
    next();
}


//prefind
//populate posts
CommentSchema.pre("find",populatePost);

//populate user
CommentSchema.pre("find",populateUser);

//export Schema
module.exports = CommentSchema;