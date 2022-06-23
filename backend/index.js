const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const Users = require("./models/userModel");
const serverConfig = require("./config/serverConfig");
const products = require("./fakeDb/products.json");
const Mailer = require("./services/mailService")

const app = express();
mongoose
    .connect(dbConfig.MONGODB_URL)
    .then((data) => console.log("MONGO DB is connected."))
    .catch((err) => console.log(`${err}`));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// enable CORS - API calls and resource sharing
app.use(cors());
// nodemailer config
// const mailer = mainService.configureMail();

// Login
app.post("/api/login", (req, res) => {
    console.log("request body ->", req.body);
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

app.post("/api/register", async (req, res) => {
    const reqBody = req.body;
    console.log("request body", reqBody)
    Users.findOne({username: reqBody.username}, async (err, data) => {
        if (err) {
            const errorMsg = `Error on register user: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }
        if (data) {
            console.log(data)
            res.send(`user already exist: ${data.username}`);
        } else {
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();

            const sendMail = new Mailer({
                recipient: reqBody.email,
                subject: "Activate account",
                htmlMsg: `
                        <h1>Activate account</h1>
                        <p>Dear, ${reqBody.username}</p>
                        <p>Please click on link bellow to activate your account</p>
                        <a href="http://localhost:3000/user-activate/${saveNewUser._id.toString()}" target="_blank">Activate link</a>`
            })

            sendMail.sendMail();

            res.send(saveNewUser || "User not registered.");
        }
    });
});

app.get("/", (req, res) => {
    res.send("Welcome to server");
});

//delete user by email
app.delete("/api/user/:email", (req, res) => {
    const params = req.params.email;
    Users.deleteOne({email: params}, null, (error) => {
        if (error) throw error;
        res.send("User deleted");
    });
});

//get all users
app.get("/api/users", (req, res) => {
    Users.find((error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

//get one user by username
app.get("/api/user/:username", (req, res) => {
    const param = req.params.username;
    Users.find({username: param}, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

//update user email by username
app.put("/api/user/:username", (req, res) => {
    const param = req.params.username;
    const query = req.query;

    Users.updateOne(
        {username: param},
        {email: query.email, isAdmin: query.admin},
        null,
        (error, result) => {
            if (error) throw error;
            res.send(result);
        }
    );
});

app.post("/api/complete-registration", (req, res) => {
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

app.get("/api/products", (req, res) => {
    res.send(products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const foundProduct = products.find(
        (product) => product.id === parseInt(productId)
    );
    res.send(foundProduct);
});

app.get("/api/top-products/:top", (req, res) => {
    let topNumber = req.params.top
    let copyProduct = [...products]
    let sorted = copyProduct.sort((a, b) => {
            return b.rating.rate - a.rating.rate
        }
    )

    res.send(sorted.splice(0, topNumber))
})


app.listen(serverConfig.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(serverConfig.serverRunningMsg);
        console.log(serverConfig.serverLink);
    }
});