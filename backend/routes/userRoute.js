const validationService =  require("../services/validationService");
const express = require('express');
const Users = require("../models/userModel");
const nodemailer = require("nodemailer");
const routes = express.Router();
var jwt = require('jsonwebtoken');

routes.post("/change-password", async (req, res) => {
    const reqBody = req.body
    Users.findOne({_id: reqBody.userId}, async (error, result) => {
        if (error) {
            const errorMsg = `Error on getting user from DB: ${error}`;
            res.status(201).send(errorMsg)
            return
        }

        let userData = await result
        let storedPassword = userData.password
        if (reqBody.oldPassword === storedPassword) {
            Users.updateOne({_id: reqBody.userId}, {password: reqBody.newPassword}, (error, result) => {
                if (error) {
                    res.send(error)
                    return
                }
                res.send(userData)
            })
        } else {
            res.status(210).send("Old password is not match with your current password!")
        }
    })
})

routes.post("/login", validate, (req, res) => {
    console.log('request body ->', req.body);
    const reqBody = req.body;
    const foundUser = Users.findOne(reqBody, (err, data) => {
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.status(416).send(errorMsg);
            return;
        }

        if (!data)
            res.status(409).send('User not found.');
        else {
            let userIsActive = data.isActive === 'true';
            var token = jwt.sign({...data}, 'shhhhh');
            res.status(userIsActive ? 200 : 210).send(userIsActive ? {token, user: data} : "Please activate you account.")
        }
        // way 1
        // if (data)
        //     res.send(data);
        // else
        //     res.status(409).send('User not found.');

        // way 2
        // res.send(data ? data : 'User not found.');

        // way 3
        // res.send(data || "User not found.");
    });
});

// Register
routes.post("/register", async (req, res) => {
    const reqBody = req.body;

    Users.findOne(reqBody, async (err, data) => {
        if (err) {
            const errorMsg = `Error on register user: ${err}`;
            res.send(errorMsg);
            return;
        }

        if (data) res.send(`user already exist: ${data.username}`);
        else {
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();

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

            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <office@onlineShop.com>', // sender address
                to: reqBody.email, // list of receivers
                subject: "Activate account", // Subject line
                text: "", // plain text body
                html: `
            <h1>Activate account</h1>
            <p>Dear, ${reqBody.username}</p>
            <p>Please click on link bellow to activate your account</p>
            <a href="http://localhost:3000/user-activate/${saveNewUser._id.toString()}" target="_blank">Activate link</a>
            `, // html body
            });


            console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

            res.send(saveNewUser || 'User not registered.');
        }
    });
});

//delete user by id
routes.delete("/delete:id", (req, res) => {
    const params = req.params.id;
    Users.deleteOne({_id: params}, async (error) => {
        if (error) throw error;
       await res.send("User deleted");
    });
});


routes.get("/get-all-users", validationService.authValidation, (req, res) => {
    Users.find((error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

routes.post("/complete-registration", (req, res) => {
    const userId = req.body.userId;
    Users.updateOne({_id: userId}, {isActive: true}, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("activate user...", result);
            res.send(result);
        }
    });
});

// update user
routes.put("/user-profile", (req, res) => {
    let id = req.body._id;
    Users.updateOne({"_id": id}, {
        $set: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            isAdmin: req.body.isAdmin
        }
    }, (err, data) => {
        if (err) {
            console.log(err);
            const errorMsg = `Error on updating user: ${err}`;
            res.send(errorMsg);
        } else {
            res.send(data);
        }
    })
});

function validate(req, res, next) {
    console.log('validate...', req.body);
    let body = req.body;
    if (!body.username || !body.password) {
        res.send('not valid');
        return;
    }
    next();
}

module.exports = routes;
