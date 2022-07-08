const express = require('express');
const routes = express.Router();
const Users = require('../model/userModel');


// * REGISTER
routes.post('/register', (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);
    Users.findOne(reqBody, async (err, data) => {
        if (err) {
            console.log(`Error on register user ${err}`)
            res.send(err);
            return;
        }

        if (data) {
            res.send(`User already exist ${data.username}`)
        } else {
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();

            let testAccount = await nodemailer.createTestAccount();
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Official website 👻" <official@onlineShop.com>', // sender address
                to: reqBody.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `
                    <div>
                        <h1>Hello, ${reqBody.username}</h1>
                        <p>Before you can login to our website, you need to activate your account by clicking on link bellow</p>
                        <p><a href="http://localhost:3000/activate-account/${saveNewUser._id.toString()}" target="_blank">Active your account here!</a></p>
                    </div>
                `, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            res.send(saveNewUser || 'User not registered')
        }
    })
})

// * LOGIN
routes.post('/login', validateLogin, (req, res) => {
    const reqBody = req.body;
    Users.findOne(reqBody, (err, data) => {
        console.log(data);
        if (err) {
            console.log(`Error to login`);
            res.status(416).send('Error to login' + err);
            return
        }

        if (data) {
            res.send(data);
        } else {
            res.send('User not found, try to register first.');
        }
    });
})

// * COMPLETE REGISTRATION THROUGHT EMAIL VERIFICATION LINK
routes.post('/complete-registration', (req, res) => {
    const userID = req.body.userID;

    Users.updateOne({ _id: userID }, { isActive: true }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data)
        }
    });
});


function validateLogin(req, res, next) {
    const reqBody = req.body;
    if(!reqBody.username || !reqBody.password){
        res.send('Not valid');
        return;
    }
    next();
}

module.exports = routes;