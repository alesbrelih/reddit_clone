// --- NEEDED MODULES --- //
const mongoose = require("mongoose");
const config = require("../../config/server.config");
const bcrypt = require("bcrypt");

//schema
var Schema = mongoose.Schema;

//user schema definition
var userSchema = new Schema({
    username: { //username
        type: String,
        required:[true, "Username is required!"],
        index: {
            unique:true
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Email must be unique!"],
        required: [true, "Email is required!"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { //pwd hash
        type: String,
        required: [true, "Password is required!"],
    },
    created: { //acc created date
        type: Date,
        default: Date.now
    },
    deleted: { // flag that shows if deleted
        type: Boolean,
        default: false,
        required: true
    },
    _postsIds: [ //all user posts
        {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    ],
    _commentsIds: [ //all user comments
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ]

});

// --- populate functions --- //

//Populate posts
function populatePosts(next){
    //user obj ref
    const self = this;

    self.populate({
        path: "_postsIds",
        select: "title content created edited votes"
    });
    next();
}

//populate comments
function populateComments(next){

    //user obj ref
    const self = this;

    self.populate({
        path: "_commentsIds",
        select: "content votes created edited"
    });

    next();
}

//----- HASING PWD BEFORE SAVE ------ //

//done : err cb
//next : for parralel execution
userSchema.pre("save",true,function(next,done){
    //reference user model
    const self = this;

    bcrypt.genSalt(config.hash.saltFactor,function(err,salt){

        //throw err if err
        if(err){
            done(new Error(err));
        }

        //gen password
        bcrypt.hash(self.password,salt,function(err,hash){
            //if err throw err
            if(err){
                done(new Error(err));
            }

            //save hashed pwd
            self.password = hash;
            done();
        });
    });
    next();
});


// --- PRE FINDS POPULATE --- //

//populate comments
//true indicates parralel
userSchema.pre("find",populateComments);

//populate posts
userSchema.pre("find",populatePosts);



// ---- SCHEMA METHODS ---- //

//const method to compare pwd
userSchema.methods.checkPassword = function(password, next){

    //object ref
    const self = this;

    //compare pwd
    bcrypt.compare(password,self.password,function(err,match){

        //error happened at comparing
        if(err){
            next(new Error(err));
        }

        //pwds match
        if(match){
            next(null,self);

        }
        //pwds dont match
        else{
            next(new Error("Password do not match"));
        }
    });

};

//export schema
module.exports = userSchema;