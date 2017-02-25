// ---- MODULES ---- //
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// create object
const subredditHeaderSchema = new Schema({

    _subreddit:{
        type: mongoose.Schema.ObjectId,
        ref: "Subreddit",
        required: [true, "Subreddit header needs to reference a subreddit!"]
    },
    bgcolor: {
        type: String,
        required: true,
        default: "#FFFFFF" // white bg as default
    },
    bgphoto:{
        type: String
    },
    TODO: IMPLEMENT SUBREDIT HEADER SCHEMA


});

