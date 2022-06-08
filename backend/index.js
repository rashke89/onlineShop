const express = require("express");
const mongoose = require("mongoose");
// * backend ima zabranu da komunicira sa drugim serverima, u nasem slucaju sa frontend serverom
// * da bismo omogucili komunikaciju sa backendom onda nam je potreban Third-party 'cors' (cross origin resource sharing)
// * dozvoljavamo serveru da seruje podatke sa drugim serverima
const cors = require('cors');
const dbConfig = require("./config/dbConfig");
const Users = require("./models/userModel");
const serverConfig = require("./config/serverConfig");

const app = express();
mongoose
    .connect(dbConfig.MONGODB_URL)
    .then((data) => console.log("MONGO DB is connected."))
    .catch((err) => console.log(`${err}`));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// enable CORS - API calls and resource sharing
// * ukljucujemo cors u nasoj app
app.use(cors());

// Login
app.post("/api/login", (req, res) => {
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

        res.send(data || "User not found.");
    });
});

// Register
app.post("/api/register/:id", async (req, res) => {
    const reqBody = req.body;
    console.log('reg user data:', req.params);

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
            // console.log(saveNewUser);

            res.send(saveNewUser || "User not registered.");
        }
    });
});

// get one user: GET method, URL: 'api/user/:username', {username} is URL param // * done
// get all users: GET method, URL: 'api/users', // * done
// edit user: PUT method, URL: 'api/user/:username', // ! error

// ! OVO MI NE RADI - START
// * UPDATE ONE USER
app.put('/api/user/:username', (req, res) => {
    const reqBody = req.body;
    const reqParams = req.params;
    const reqQuery = req.query;
    console.log(reqBody, 'JA SAM IZ PUT METODE');

    Users.updateOne({"username": reqParams.username}, {
        username: reqQuery.name,
        email: reqQuery.email,
        isAdmin: reqQuery.admin
    }, null, (err, data) => {
        if (err) res.send('Doslo je do greske prilikom promene usera ' + reqBody.username + ' molimo pokusajte za nekoliko minuta ponovo.');
        else res.send(data);

        console.log(data);
    });
});
// ! OVO MI NE RADI - END

// * GET ONE USER
app.get('/api/user/:username', (req, res) => {
    const reqParam = req.params;
    console.log(reqParam);
    const user = Users.findOne({"username": reqParam.username}, (err, data) => {
        if (err) res.send('Doslo je do greske prilikom pretrage usera ' + reqParam.username);
        else res.send(data);
    });
    console.log(user);
});

// * GET ALL USERS
app.get('/api/users', (req, res) => {

    const allUsers = Users.find((err, data) => {
        if (err) res.send('Greska prilikom pretrage, pokusajte ponovo.');
        else res.send(data);

    });
    console.log(allUsers);
});

// * DELETE USER
app.delete('/api/user/:email', (req, res) => {
    const param = req.params.email;
    console.log(param);

    Users.deleteOne({email: param}, (err, data) => {
        if (err) res.send('Doslo je do greske prilikom brisanja usera ' + req.body.username);
        else res.send(data);
    });
});


app.listen(serverConfig.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(serverConfig.serverRunningMsg);
    }
});
