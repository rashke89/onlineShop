const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const nodemailer = require('nodemailer');
const dbConfig = require("./config/dbConfig");
const Users = require("./models/userModel");
const serverConfig = require("./config/serverConfig");
// const mainService = require("./services/mailService");

const app = express();
mongoose
	.connect(dbConfig.MONGODB_URL)
	.then((data) => console.log("MONGO DB is connected."))
	.catch((err) => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// nodemailer config
// const mailer = mainService.configureMail();

// Login
app.post("/api/login", (req, res) => {
	const reqBody = req.body;

	const foundUser = Users.findOne(reqBody, (err, data) => {
		console.log(data);
		if (err) {
			const errorMsg = `Error on getting user from DB: ${err}`;
			console.log(errorMsg);
			res.send(errorMsg);
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
app.post("/api/register", async (req, res) => {
	const reqBody = req.body;
	console.log('reg user data:', reqBody);
	let currentUserData = {
		username: reqBody.username,
		email: reqBody.email
	}


	Users.findOne(currentUserData, async (error, result) => {
		if(error) {
			const errMsg = 'Registration error';
			res.send(errMsg);
			return;
		}

		if(result) {
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
        `, // html body
			});

			console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));

			res.send({newUser: saveNewUser, registerStatus: true} || 'User not registered.');
		}
	})

	// Users.findOne(reqBody, async (err, data) => {
	//   console.log(data);
	//   if (err) {
	//     const errorMsg = `Error on register user: ${err}`;
	//     console.log(errorMsg);
	//     res.send(errorMsg);
	//     return;
	//   }
	//
	//   if (data) res.send(`user already exist: ${data.username}`);
	//   else {
	//     const newUser = new Users(reqBody);
	//     const saveNewUser = await newUser.save();
	//     console.log(saveNewUser);
	//
	//     res.send(saveNewUser || "User not registered.");
	//   }
	// });
});

// get one user: GET method, URL: 'api/user/:username', {username} is URL param
app.get('/api/user/:username', (req, res) => {
	const param = req.params.username;
	Users.find({'username': param}, (error, result) => {
		if(error) throw error;
		res.send(result);
	})
})

// get all users: GET method, URL: 'api/users'
app.get('/api/user', (req, res) => {
	Users.find((error, result) => {
		if(error) throw error;
		res.send(result);
	})
})
// edit user: PUT method, URL: 'api/user/:username'
app.put('api/user/:username', (req, res) => {
	const param = req.params.username;
	const query = req.query;

	Users.updateOne({"username": param}, {email: query.email, isAdmin: query.admin}, null, (error, result) => {
		if (error) throw error;
		res.send(result);
	})
})

app.post('/api/complete-registration', (req, res) => {
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

app.listen(serverConfig.port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(serverConfig.serverRunningMsg);
	}
});
