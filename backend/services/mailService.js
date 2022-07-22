const nodemailer = require('nodemailer');

async function configureMail() {
    let testAccount = await nodemailer.createTestAccount();

     let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

     return transporter;
}

module.exports = {
    configureMail: configureMail
};
