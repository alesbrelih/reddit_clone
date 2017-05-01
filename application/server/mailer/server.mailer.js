const nodemailer = require("nodemailer"),
    config = require("../config/server.config");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: config.email.username,
        pass: config.email.password
    }
});

const mailerFunctions = {
    sendRecoverPassword : (email, jwt, cb) => {
        const emailObj = {
            from: "noreply noreply@node-clone",
            to: email, // list of receivers
            subject: "Forgot password", // Subject line
            text: 'Folow',
            html: `Follow this <a href="http://localhost/auth/forgot-password/${encodeURIComponent(jwt)}">link</a>  to reset your password.`


        };
        transporter.sendMail(emailObj, cb);
    }
};


module.exports = mailerFunctions;
