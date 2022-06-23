const express = require ('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dbConfig = require('./config/dbConfig');
const Users = require('./models/userModel');
const serverConfig = require('./config/serverConfig');


const  app = express();
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log('mongo db is connected.'))
    .catch(err => console.log('Error while connecting to MONGO DB: $(err)'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router.use();

app.post('/api/login', (req, res) =>{
    const reqBody = req.body;
    console.log(req.body);

    const foundUser = Users.findOne(reqBody, (err, data) => {
        console.log(data);
        if (err){
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }
        // way 1
        // if(data)
        //     res.send(data);
        // else
        //     res.send('User not found');

        // way 2
        // res.send(data ? data : 'User not found');

        //way 3
        res.send(data || 'User not found');

    });
});
app.post('/api/register', async (req,res) =>{
    const reqBody = req.body;

    // console.log('reg user data:', reqBody);

    Users.findOne(reqBody, async (err, data) => {
        console.log(data);
        if (err){
            const errorMsg = `Error on register user: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }
        if (data)
            res.send(`User already exist: ${data.username}`);
        else{
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();
            console.log(saveNewUser);

            res.send(saveNewUser || 'User not registered');
        }
    });


    const newUser = new Users(reqBody);
    const saveNewUser = await newUser.save();
    console.log(saveNewUser);

    res.send(saveNewUser || 'User not registered');
})

//get one user: GET method, URL: 'api/user/:username', {username} is URL param
//get all users: GET method, URL: 'apo/users',
// edit user: PUT method, URL: 'api/user/:username'

app.listen(serverConfig.port, err =>{
    if(err)
        console.log(err);
    else
        console.log(serverConfig.serverRunningMsg);
});