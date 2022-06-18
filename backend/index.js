// const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors")
const dbConfig = require('./config/dbConfig');
const Users = require('./models/userModel');
const serverConfig = require('./config/serverConfig');
const app = express();


//CONNECT TO MONGO DB
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log('MONGO DB is connected.'))
    .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));
//CONNECT TO MONGO DB END

app.use(express.urlencoded({ extended: false }));//If extended is false, you can not post "nested object"
app.use(express.json());//Frontend request convert in JSON
//Enable CORS-API calls and resource sharing
app.use(cors());

//LOGIN
app.post('/api/login', (req, res) => {
    const reqBody = req.body;

    const foundUser = Users.findOne(reqBody, (err, data) => {
        console.log(data);
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }


        res.send(data || 'User not found.');

    });
});
//LOGIN END


//REGISTER
app.post('/api/register', async (req, res) => {
    const reqBody = req.body;
    // console.log('reg user data:', reqBody);

    Users.findOne(reqBody,  async (err, data) => {
        if (err) {
            const errorMsg = `Error on register user: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }

        if (data)
            res.send(`user already exist: ${data.username}`);
        else {
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();
            console.log(saveNewUser);

            res.send(saveNewUser || 'User not registered.');
        }
    });

});
//REGISTER END

//Server TEST
app.get("/",(req, res)=>{
    res.send("Welcome to server");
})


//delete user by email
app.delete("/api/user/:email",(req, res)=>{
    const params = req.params.email
    Users.deleteOne({email:params},null,(error)=>{
        if (error) throw error
        res.send("User deleted")
    })
})

//get all users
app.get("/api/users",(req, res)=>{
    Users.find((error, result)=>{
        if(error) throw error;
        res.send(result)
    })
})

//get one user by username
app.get("/api/user/:username",(req, res)=>{
    const param = req.params.username
    Users.find({"username":param},(error, result)=>{
        if(error) throw error;
        res.send(result)
    })
})

//update user email by username
app.put("/api/user/:username",(req, res)=>{
    const param = req.params.username
    const query = req.query

    Users.updateOne({"username":param},{email:query.email,isAdmin:query.admin},null,(error, result)=>{
        if(error) throw error
        res.send(result)
    })
})



//SERVER LISTENING
app.listen(serverConfig.port, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(serverConfig.serverRunningMsg);
    }
});
