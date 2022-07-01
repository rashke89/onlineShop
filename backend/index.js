const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const nodemailer = require('nodemailer');
const dbConfig = require("./config/dbConfig");
const Users = require("./models/userModel");
const serverConfig = require("./config/serverConfig");
const Product = require("./models/productModel")
// const mainService = require("./services/mailService");

const app = express();

// MongoDB connection
mongoose
	.connect(dbConfig.MONGODB_URL)
	.then((data) => console.log("MONGO DB is connected."))
	.catch((err) => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// get shop products
app.get("/shop/products", (req, res) => {
	Product.find((error, data) => {
		if(error) {
			console.log(error);
			res.send("Products could not be loaded. Please try again later.");
			return;
		}
		res.send(data || "Product not found.");
	})
})

// get shop product details
app.get("/api/products/:productId", (req, res) => {
	const productId = req.params.productId;
	Product.findOne({_id: productId}, (error, data) => {
		if(error) {
			console.log(error);
			res.send("Product details could not be loaded.")
			return;
		}
		res.send(data || "Product not found.");
	})
})

// get my products
app.get("/product/getMyProducts/:userId", (req, res) => {
	const userId = req.params.userId;
	Product.find({userId: userId}, (error, data) => {
		if(error) {
			res.send(error);
		}
		res.send(data || "No products jet.");
	})
})

// add my product
app.post("/product/addMyProduct", (req,res)=>{

	const reqBody=req.body;
	Product.findOne(reqBody, async (err, data) => {
		// console.log(data);
		if (err) {
			const errorMsg = `Error on register user: ${err}`;
			console.log(errorMsg);
			res.send(errorMsg);
			return;
		}

		if (data) res.send(`Product already exist.`);
		else {
			const newProduct = new Product(reqBody);
			const saveNewProduct = await newProduct.save();
			console.log("Saved product",saveNewProduct);
			res.send(saveNewProduct || 'Product not saved.');
		}
	});
})

// get my product
app.get('/product/getMyProduct/:myProductId', (req, res) => {
	const myProductId=req.params.myProductId;

	Product.findOne({_id: myProductId}, (error, data) => {
		if(error) {
			console.log(error);
			res.send(error);
		}
		res.send(data);
	})
})

// update my product
app.put('/product/save/:myProductId', (req, res) => {
	const params = req.params.myProductId;

	Product.updateOne({_id: params}, req.body, null, (error, result) => {
		if(error) throw error;
		res.send(result);
	})
})

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
