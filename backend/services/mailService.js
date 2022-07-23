const nodemailer = require('nodemailer');
const mailConfig = require("../config/mailConfig");

class Mailer {
    constructor({recipient, subject, htmlString}) {
        this.mailOptions = {
            from: mailConfig.fromName + "<" + mailConfig.fromMail + ">", // sender address
            to: recipient, // list of receivers
            subject: subject, // Subject line
            text: "", // plain text body
            html: htmlString, // html body
        }
    }

    async sendMailToRecipient() {

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        let info = await transporter.sendMail(this.mailOptions);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        return nodemailer.getTestMessageUrl(info)
    }

}

module.exports = Mailer
