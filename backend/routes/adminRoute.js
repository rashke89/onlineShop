const express = require('express');
const routes = express.Router();
const Categories = require("../models/categoriesModel")
const validationService = require("../services/validationService");

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
}, getAllCategories)

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