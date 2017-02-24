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
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        _post: { //post fk
            type: mongoose.Types.ObjectId,
            ref: "Post",
            required: true
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

    //end parralel
    next();
}


//export Schema
module.exports = CommentSchema;