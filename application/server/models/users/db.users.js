// --- NEEDED MODULES --- //
const mongoose = require("mongoose");
const config = require("../../config/server.config");
const bcrypt = require("bcrypt");


var Schema = mongoose.Schema;

//user schema definition
var userSchema = new Schema({
    username: {
        type: String,
        required:[true, "Username is required!"],
        index: {
            unique:true
        }
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

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