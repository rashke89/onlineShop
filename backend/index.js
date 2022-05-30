const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig');
const mongoose = require('mongoose');
const Users = require('./models/userModel');

const app = express();
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log('MONGO DB is connected.'))
    .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);

    const foundUser = Users.findOne(reqBody, (err, data) => {
        // console.log(data);
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
        }
        else {
            res.send(data);
        }
    });
});

app.listen(4000, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server is running on port: 4000`);
    }
});
