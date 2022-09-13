var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'youremail@gmail.com',
        pass: 'here app password'
    }
});

module.exports = function (user,password) {

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: user.email,
        subject: 'The Prep Lab Forgot Password',
        text: 'Forgoton Password',
        html: `<h2>${user.fullname}!</h2><p> Thanks for changing your password. Your password is given below.</p><h4>${password}</h4>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}