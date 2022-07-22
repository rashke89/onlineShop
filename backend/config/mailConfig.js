const mailConfig = {
    fromName:"online-shop",
    fromMail:"office@onlineShop.com",
    host:"smtp.ethereal.email",
    port:587,
    secure: false, // true for 465, false for other ports
    auth:{
        user:"username",
        pass:"password"
    }
}

module.exports = mailConfig