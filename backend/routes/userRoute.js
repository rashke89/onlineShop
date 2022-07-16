const express = require('express');
const routes = express.Router();
const Users = require("../models/userModel");
const nodemailer = require("nodemailer");

// Login
routes.post("/login", validate, (req, res) => {
	const reqBody = req.body;

	const foundUser = Users.findOne(reqBody, (err, data) => {
		console.log(data);
		if (err) {
			const errorMsg = `Error on getting user from DB: ${err}`;
			console.log(errorMsg);
			res.send(errorMsg);
			return;
		}

		if(data) {
			res.send(data)
		} else {
			res.status(409).send('User not found.');
		}
	});
});

// Validate login
function validate(req, res, next){
	let body = req.body;
	if(!body.username || !body.password) {
		res.send("Login failed.");
		return;
	}
	next();
}

// Register
routes.post("/register", async (req, res) => {
	const reqBody = req.body;
	console.log('reg user data:', reqBody);
	let currentUserData = {
		username: reqBody.username,
		email: reqBody.email
	}

	Users.findOne(currentUserData, async (error, result) => {
		if (error) {
			const errMsg = 'Registration error';
			res.send(errMsg);
			return;
		}

		if (result) {
			res.send('User is already registered');
		} else {
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
				 }
			 });

			let info = await transporter.sendMail({
				from: '"Fred Foo 👻" <office@onlineShop.com>', // sender address
				to: reqBody.email, // list of receivers
				subject: "Activate account", // Subject line
				text: "Hello world?", // plain text body
				html: `
          <h1>Activate account</h1>
          <p>Dear, ${reqBody.username}</p>
          <p>Please click on link below to activate your account</p>
          <a href="http://localhost:3000/user-activate/${saveNewUser._id.toString()}" target="_blank">Activate link</a>
        ` // html body
			});

			console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));

			res.send({newUser: saveNewUser, registerStatus: true} || 'User not registered.');
		}
	})
});

// Complete registration
routes.post('/complete-registration', (req, res) => {
	const userId = req.body.userId;

	Users.updateOne({_id: userId}, {isActive: true}, (error, result) => {
		if(error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(result);
		}
	})
})

// Delete user
routes.delete("/:email", (req, res) => {
	const userEmail = req.params.email;

	Users.deleteOne({email: userEmail}, null, (error) => {
		if(error) throw error;
		res.send("User deleted.");
	})
})

// Get all Users
routes.get('/get-all-users', (req, res) => {
	Users.find((error, result) => {
		if(error) throw error;
		res.send(result);
	})
})

// Get one user
routes.get('/:userId', (req, res) => {
	const userId = req.params._id;
	Users.find({'userId': userId}, (error, result) => {
		if(error) throw error;
		res.send(result);
	})
})

// Edit user
routes.put('api/user/:userId', (req, res) => {
	const userId = req.params._id;
	const query = req.query;

	Users.updateOne({"userId": userId}, {email: query.email, isAdmin: query.admin}, null, (error, result) => {
		if (error) throw error;
		res.send(result);
	})
})


module.exports = routes;