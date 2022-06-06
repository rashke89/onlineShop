const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const Users = require("./models/userModel");
const serverConfig = require("./config/serverConfig");

const app = express();
mongoose
  .connect(dbConfig.MONGODB_URL)
  .then((data) => console.log("MONGO DB is connected."))
  .catch((err) => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// enabled CORS - API calls and resource sharing
app.use(cors());

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

app.post("/api/register", async (req, res) => {
  const reqBody = req.body;
  // console.log('reg user data:', reqBody);

  Users.findOne(reqBody, async (err, data) => {
    console.log(data);
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
      console.log(saveNewUser);

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
  Users.deleteOne({ email: params }, null, (error) => {
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
  Users.find({ username: param }, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

//update user email by username
app.put("/api/user/:username", (req, res) => {
  const param = req.params.username;
  const query = req.query;

  Users.updateOne(
    { username: param },
    { email: query.email, isAdmin: query.admin },
    null,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// get one user: GET method, URL: 'api/user/:username', {username} is URL param
// get all users: GET method, URL: 'api/users',
// edit user: PUT method, URL: 'api/user/:username',

app.listen(serverConfig.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(serverConfig.serverRunningMsg);
    console.log(serverConfig.serverLink);
  }
});
