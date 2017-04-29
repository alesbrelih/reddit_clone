const mailer = require("express-mailer"),
    config = require("../config/server.config");

function setUpMailer(app) {
    var mailerOpts = {
        host: config.email.host, // hostname
        transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: config.email.username,
            pass: config.email.password
        }
    };

    //extend app with mailing options
    mailer.extend(app, mailerOpts);

}

module.exports = setUpMailer;
