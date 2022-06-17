const nodemailer = require("nodemailer");
const mailConfig = require("../config/mailerConfig")

class Mailer {
    constructor({recipient, subject, text, htmlMsg}) {
        this.mailOptions = {
            from: `"${mailConfig.ownerName}" <${mailConfig.ownerEmail}>`, // sender address
            to: recipient, // list of receivers
            subject: subject, // Subject line
            text: text && "", // plain text body
            html: htmlMsg, // html body
        }
    }

    transporter() {
        return nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure, // true for 465, false for other ports
            auth: mailConfig.auth,
        });
    }

    sendMail() {
        this.transporter().sendMail(this.mailOptions, (err, info) => {
            if (err) {
                return err
            } else {
                return ("Email sent" + info.response)
            }
        })
    }
}

module.exports = Mailer
