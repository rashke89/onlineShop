const mailerConfig = {
    ownerName: "Dejan Zivkovic",
    ownerEmail: "office@zile028.com",
    host: "mail.zile028.com",//SMTP server
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "office@zile028.com", // username of email account
        pass: "office134679+", // password of email account
    },

}

module.exports = mailerConfig