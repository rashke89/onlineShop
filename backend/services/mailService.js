const nodemailer = require("nodemailer");

class Mailer {
    constructor({recipient, subject, text, htmlMsg}) {
        this.mailOptions = {
            from: '"Dejan Zivkovic" <office@zile028.com>', // sender address
            to: recipient, // list of receivers
            subject: subject, // Subject line
            text: text && "", // plain text body
            html: htmlMsg, // html body
        }
    }

    transporter() {
        return nodemailer.createTransport({
            host: "mail.zile028.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "office@zile028.com", // generated ethereal user
                pass: "office134679+", // generated ethereal password
            },
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
