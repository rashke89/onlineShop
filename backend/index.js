const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const Users = require("./models/userModel");
const serverConfig = require("./config/serverConfig");
const Mailer = require("./services/mailService")

const app = express();
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log("MONGO DB is connected."))
    .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.post("/api/login", (req, res) => {
    const reqBody = req.body;

    const foundUser = Users.findOne(reqBody, (err, data) => {
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            res.send(errorMsg);
            return;
        }
        res.send(data || false);
    });
})

app.post("/api/register", async (req, res) => {
    const reqBody = req.body;
    console.log("request body", reqBody)
    const condition = {$or: [{username: reqBody.username}, {password: reqBody.password}]}
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

            console.log(sendMail.sendMail())

            res.send(saveNewUser || "User not registered.");
        }
    });
});

app.get("/", (req, res) => {
    res.send("Welcome to server");
})


//delete user by email
app.delete("/api/user/:email", (req, res) => {
    const params = req.params.email
    Users.deleteOne({email: params}, null, (error) => {
        if (error) throw error
        res.send("User deleted")
    })
})

//get all users
app.get("/api/users", (req, res) => {
    Users.find((error, result) => {
        if (error) throw error;
        res.send(result)
    })
})

//get one user by username
app.get("/api/user/:username", (req, res) => {
    const param = req.params.username
    Users.findOne({"username": param}, (error, result) => {
        if (error) throw error;
        res.send(result)
    })
})

//update user email by username
app.put("/api/user/:username", (req, res) => {
    const param = req.params.username
    const query = req.query

    Users.updateOne({"username": param}, {email: query.email, isAdmin: query.admin}, null, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

app.post("/api/complete-registration", (req, res) => {
    const userId = req.body.userId;
    Users.updateOne({_id: userId}, {isActive: true}, (error, result) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            console.log("Activate user...", result)
            res.send(result)
        }
    })
})


app.listen(serverConfig.port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(serverConfig.serverRunningMsg);
        console.log(serverConfig.serverLink);
    }
});