// ---- MODULES ---- //
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// create object
const subredditHeaderSchema = new Schema({

    bgcolor: {
        type: String,
        required: true,
        default: "#FFFFFF" // white bg as default
    }

});

//export subreddit
module.exports = subredditHeaderSchema;

