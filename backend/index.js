const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dbConfig = require('./config/dbConfig');
const Users = require('./models/userModel');
const Emails = require('./models/emailModel');
const serverConfig = require('./config/serverConfig');
const mainService = require('./services/mailService');
const products = require('./fakeDb/products.json');
const Product = require('./models/productModel');
const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');

const app = express();
mongoose
  .connect(dbConfig.MONGODB_URL)
  .then((data) => console.log('MONGO DB is connected.'.yellow.bold))
  .catch((err) => console.log(`${err}`.red.underline));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// enable CORS - API calls and resource sharing
app.use(cors());
// nodmailer config
// const mailer = mainService.configureMail();

//get products

app.get('/shop/products', (req, res) => {
  Product.find((error, data) => {
    if (error) {
      console.log(error);
      res.send('ERROR. TRY AGAIN.');
      return;
    }

    if (data) {
      res.send(data);
    } else {
      res.send('Product dont found');
    }
  });
});

//get product
app.get('/shop/product/:productId', (req, res) => {
  const productId = req.params.productId;
  Product.findOne({ _id: productId }, (error, data) => {
    if (error) {
      console.log(error);
      res.send('ERROR. Try Again.');
    }

    if (data) {
      res.send(data);
    } else {
      res.send('Product dont found');
    }
  });
});

//add myProduct

app.post('/product/add', (req, res) => {
  const reqBody = req.body;
  Product.findOne(reqBody, async (err, data) => {
    // console.log(data);
    if (err) {
      const errorMsg = `Error on register user: ${err}`;
      console.log(errorMsg);
      res.send(errorMsg);
      return;
    }

    if (data) res.send(`Product already exist`);
    else {
      const newProduct = new Product(reqBody);
      const saveNewProduct = await newProduct.save();
      console.log('Saved product', saveNewProduct);
      res.send(saveNewProduct || 'Product not saved');
    }
  });
});
//delete myAd
app.delete('/product/delete/:myAdId', (req, res) => {
  const myAdId = req.params.myAdId;
  Product.deleteOne({ _id: myAdId }, async (error) => {
    if (error) throw error;
    await res.send('Product deleted');
  });
});

//getMyAd

app.get('/product/getMyAd/:myAdId', (req, res) => {
  const myAdId = req.params.myAdId;

  Product.findOne({ _id: myAdId }, (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    }
    res.send(data);
  });
});

//update myAd

app.put('/product/save/:myAdId', (req, res) => {
  const params = req.params.myAdId;

  Product.updateOne({ _id: params }, req.body, null, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

// user routes
app.use('/api/user', userRoute);

// * CONTACT MESSAGE API CALL
app.post('/api/send-message', async (req, res) => {
  const reqBody = req.body;

  // * ADD TO DATABASE
  const newMessage = new Emails(reqBody);
  const saveNewMessage = await newMessage.save();
  // console.log(saveNewMessage);

  // * NODEMAILER
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${reqBody.firstName} ${reqBody.lastName} <${reqBody.email}>`, // sender address
    to: 'onlineShop, office@onlineShop.com', // list of receivers
    // subject: "", // Subject line
    // text: "Hello world?", // plain text body
    html: `
        <p>
            ${reqBody.message}
        </p>
        `, // html body
  });

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  res.send();
});

app.get('/', (req, res) => {
  res.send('Welcome to server');
});

// get my ads
app.get('/product/my-adds/:userId', (req, res) => {
  const userId = req.params.userId;
  Product.find({ userId: userId }, (error, data) => {
    if (error) {
      res.send(error);
    }

    if (data) {
      console.log(data);
      res.send(data);
    } else {
      res.send('No products jet.');
    }
  });
});

//get one user by username
app.get('/api/user/:username', (req, res) => {
  const param = req.params.username;
  Users.find({ username: param }, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

//update user email by username
app.put('/api/user/:username', (req, res) => {
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

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const findedProduct = products.find(
    (product) => product.id === parseInt(productId)
  );
  res.send(findedProduct);
});

app.get('/api/top-products/:top', (req, res) => {
  let topNumber = req.params.top;
  let copyProduct = [...products];
  let sorted = copyProduct.sort((a, b) => {
    return b.rating.rate - a.rating.rate;
  });

  res.send(sorted.splice(0, topNumber));
});

app.use('/api/payment', paymentRoute);

app.listen(serverConfig.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(serverConfig.serverRunningMsg);
    console.log(serverConfig.serverLink);
  }
});
