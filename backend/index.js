// const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors")
const dbConfig = require('./config/dbConfig');
const serverConfig = require('./config/serverConfig');
const app = express();
const Product=require("./models/productModel")
const userRouter=require('./routes/userRoute')



//CONNECT TO MONGO DB
mongoose.connect(dbConfig.MONGODB_URL)
    .then(() => console.log('MONGO DB is connected.'))
    .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));
//CONNECT TO MONGO DB END

app.use(express.urlencoded({ extended: false }));//If extended is false, you can not post "nested object"
app.use(express.json());//Frontend request convert in JSON
//Enable CORS-API calls and resource sharing
app.use(cors());

//get products

app.get('/shop/products', (req,res)=>{

    Product.find((error,data)=>{
        if(error){
            console.log(error);
            res.send("ERROR. TRY AGAIN.");
            return;
        }

        if(data){
            res.send(data)
        }else{
            res.send("Product dont found")
        }
    })
})

//get product
app.get("/shop/product/:productId", (req, res) => {
    const productId = req.params.productId;
    Product.findOne({_id: productId}, (error, data) => {
        if(error) {
            console.log(error);
            res.send("ERROR. Try Again.")
        }

        if(data) {
            res.send(data);
        } else {
            res.send("Product dont found");
        }
    })
})

//add myProduct

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

// get myProducts
app.get("/product/getMyProducts/:userId", (req, res) => {
    const userId = req.params.userId;
    Product.find({userId: userId}, (error, data) => {
        if(error) {
            res.send(error);
        }

        if(data) {
            console.log(data);
            res.send(data);
        } else {
            res.send("No products jet.");
        }
    })
})

// get myProduct
app.get("/product/getMyProduct/:myProductId", (req, res)=>{
    const myProductId=req.params.myProductId;

    Product.findOne({_id:myProductId},(error,data)=>{
        console.log("DATA",data);
        if(error){
            console.log(error);
            res.send(error)
        }
        res.send(data)

    })
})

//delete myProduct
app.delete("/product/delete/:myProductId", (req, res) => {
    const myProductId = req.params.myProductId;
    Product.deleteOne({_id: myProductId},  async (error) => {
        if (error) throw error
        await res.send("Product deleted")
    })
})

//update myProduct

app.put("/product/save/:myProductId", (req,res)=>{
    const params=req.params.myProductId;

    Product.updateOne({"_id": params}, req.body, null, (error, result) => {
        if (error) throw error;
        res.send(result)
    })

})

//LOGIN
app.use('/api/user', userRouter )

//LOGIN END


//REGISTER
app.use('/api/user', userRouter )
//REGISTER END

//Activation user
app.use("/api/user",userRouter)

//delete user by email
app.use("/api/user/",userRouter)

//get all users
app.use("/api/",userRouter)

//get one user by username
app.get("/api/user/",userRouter)

//update user email by username
app.use("/api/user",userRouter)


//Server TEST
app.get("/",(req, res)=>{
    res.send("Welcome to server");
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
