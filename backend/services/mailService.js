const nodemailer = require('nodemailer');

class Mailer {
    constructor({recipient, subject, htmlString}) {
        this.mailOptions = {
            from: '"Fred Foo 👻" <office@onlineShop.com>', // sender address
            to: recipient, // list of receivers
            subject: subject, // Subject line
            text: "", // plain text body
            html: htmlString, // html body
        }

    }

    async sendMailToRecipient() {

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

        let info = await transporter.sendMail(this.mailOptions);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        return nodemailer.getTestMessageUrl(info)
    }

}

module.exports = Mailer
