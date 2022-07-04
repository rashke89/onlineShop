const express = require('express');
const Users = require("../models/userModel");
const nodemailer = require("nodemailer");
const routes = express.Router();

routes.post("/login", validate, (req, res) => {
    console.log('request body ->', req.body);
    const reqBody = req.body;

    const foundUser = Users.findOne(reqBody, (err, data) => {
        console.log(data);
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.status(416).send(errorMsg);
            return;
        }

        // way 1
        // if (data)
        //     res.send(data);
        // else
        //     res.send('User not found.');

        // way 2
        // res.send(data ? data : 'User not found.');

        // way 3
        res.send(data || "User not found.");
    });
});

// Register
routes.post("/register", async (req, res) => {
    const reqBody = req.body;

    Users.findOne(reqBody, async (err, data) => {
        // console.log(data);
        if (err) {
            const errorMsg = `Error on register user: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }

        if (data) res.send(`user already exist: ${data.username}`);
        else {
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();
            console.log(saveNewUser._id.toString());

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

//delete user by email
routes.delete("/:email", (req, res) => {
    const params = req.params.email;
    Users.deleteOne({email: params}, null, (error) => {
        if (error) throw error;
        res.send("User deleted");
    });
});

//get all users
routes.get("/get-all-users", (req, res) => {
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
            city: req.body.city
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
