const nodemailer = require("nodemailer");


async function configureMail() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        //     user: "zile028@gmail.com", // generated ethereal user
        //     pass: "+2791447+", // generated ethereal password
        // },

        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
}


module.exports = configureMail;
