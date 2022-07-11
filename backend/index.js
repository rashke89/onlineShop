const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dbConfig = require("./config/dbConfig");
const Users = require("./models/userModel");
const serverConfig = require("./config/serverConfig");
const Product = require("./models/productModel");
const userRoute = require("./routes/userRoute");
const paymentRoute = require('./routes/paymentRoute');
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

// delete my product
app.delete('/product/delete/:myProductId', (req, res) => {
	const myProductId = req.params.myProductId;
	Product.deleteOne({_id: myProductId}, async (error) => {
		if(error) throw error;
		await res.send("Product deleted.");
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

// User routes
app.use("/api/user", userRoute);

// Stripe
app.use('/api/payment', paymentRoute);


app.listen(serverConfig.port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(serverConfig.serverRunningMsg);
	}
});
