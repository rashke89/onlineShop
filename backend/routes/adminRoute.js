const express = require('express');
const routes = express.Router();
const Categories = require("../models/categoriesModel")
const validationService = require("../services/validationService");
const Emails = require("../models/emailModel");
const Users = require("../models/userModel");
const Product = require("../models/productModel");
const SubscribeModel = require('../models/subscribeModel');
const Comment = require("../models/commentModel");

routes.post("/addCategory", validationService.authValidation, async (req, res, next) => {
    const categoryName = req.body.categoryName
    Categories.findOne({name_lower: categoryName.toLowerCase()}, async (error, result) => {
        if (error) {
            const errMsg = "Error with check exist category, " + error
            res.send(errMsg)
            return
        } else if (result) {
            res.status(201).send("Already exist category: " + result.categoryName)
        } else {
            let newCategory = new Categories({
                categoryName: categoryName,
                name_lower: categoryName.toLowerCase()
            })
            let addCategory = await newCategory.save()
            if (addCategory) {
                next()
            } else {
                res.send("Category is not add, something went wrong!")
            }
        }
    })
}, getAllCategories)

routes.get("/categories", validationService.authValidation, getAllCategories)

routes.delete("/category", validationService.authValidation, (req, res, next) => {
    const id = req.query.id
    Categories.deleteOne({"_id": id}, (error, result) => {
        if (error) {
            const errMsg = "Error when delete categories, " + error
            res.send(errMsg)
            return
        }
        next()
    })
}, getAllCategories)

routes.get('/all-messages', (req, res) => {
    Emails.find((err, data) => {
        if (err) {
            console.log(err, "iz email");
            res.send(data)
        }
        if (data) {
            res.send(data)
        }
    })
})

routes.put("/category", validationService.authValidation, (req, res, next) => {
    const reqBody = req.body
    Categories.updateOne({"_id": reqBody.id}, {
        categoryName: reqBody.categoryName,
        name_lower: reqBody.categoryName.toLowerCase()
    }, (error, result) => {
        if (error) {
            const errMsg = "Error when update categories, " + error
            res.send(errMsg)
            return
        }
        next()
    })
}, getAllCategories);

//GET ALL COMMENTS
routes.get("/all-comments", (req, res) => {
    Comment.find((error, result) => {
        if (error) throw error;
        res.send(result);
    });
});
//DELETE COMMENT BY ID
routes.delete("/all-comments:id", (req, res) => {
    const params = req.params.id;
    Comment.deleteOne({_id: params}, async (error) => {
        if (error) throw error;
        await res.send("Comment deleted");
    });
});
//UPDATE COMMENT STATUS
routes.put("/all-comments", (req, res) => {
    let id = req.body._id;
    Comment.updateOne({"_id": id}, {
        $set: {
            comment_status: req.body.comment_status
        }
    }, (err, data) => {
        if (err) {
            console.log(err);
            const errorMsg = `Error on updating status: ${err}`;
            res.send(errorMsg);
        } else {
            res.send(data);
        }
    })
});

// get numbers for Admin
routes.get("/stats", (req, res) => {
    let userNumbers;
    let productNumbers;
    let allEmails;
    let allSubs;
    Product.find((error, data) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            productNumbers = data.length;
        }
    })
    Emails.find((error, data) => {
        if (error) {
            console.log("daddd", error);
            res.send(error)
        }
        else {
            allEmails = data.length;
        }
    })
    SubscribeModel.find((error, data) => {
        if (error) {
            console.log("daddd", error);
            res.send(error)
        }
        else {
            allSubs = data.length;
        }
    })
    Users.find((error, data) => {
        if (error) {
            console.log("daddd", error);
            res.send(error)
        }
        else {
            userNumbers = data.length;
        }
        res.send({ users: userNumbers, products: productNumbers, emails: allEmails, subs: allSubs });
    })
})

function getAllCategories(req, res) {
    Categories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "categoryName",
                foreignField: "category",
                as: "products"
            }
        },
        {$sort: {categoryName: 1}}

    ]).then((result) => {
        res.send(result)
    }).catch((error) => {
        const errMsg = "Error with get all categories, " + error
        res.send(errMsg)
    })
}

module.exports = routes
