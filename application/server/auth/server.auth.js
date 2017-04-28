const   passport = require("passport"),
    jwtStrategy = require("passport-jwt").Strategy,
    extractJwt = require("passport-jwt").ExtractJwt,
    config = require("../config/server.config"),
    mongoose = require("mongoose"),
    User = mongoose.model("User");

const jwtOptions = {
    secretOrKey : config.jwt.secret,
    jwtFromRequest : extractJwt.fromAuthHeader()
};

//configure strategy
passport.use(new jwtStrategy(jwtOptions,(payload, done)=>{
    User.findOne({ _id : payload.id }, (err, user) => {
        if (err) {
            return done(err, null);
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, null);
        }
    });
}));

//export passport middleware
module.exports = passport;