const Users = require("../models/userModel");
const express= require('express')
const nodemailer = require("nodemailer");
const {loginUser, registerUser, completeUserRegistration, deleteUser, getAllUsers, getUserByUsername,
    updateUserByUsername
} = require("../controllers/userController");
const router=express.Router();

//LOGIN
router.post('/login',validate,loginUser);

//LOGIN END

//REGISTER
router.post('/register', registerUser);
//REGISTER END

//COMPLETE REGISTRATION
router.post("/complete-registration", completeUserRegistration)


//DELETE USER
router.delete("/:email",deleteUser)


//GET ALL USERS
router.get('/users',getAllUsers)

//GET USER BY USERNAME
router.get('/:username',getUserByUsername)

//UPDATE USER BY USERNAME

router.put('/:username',updateUserByUsername)


function validate(req,res,next){
    let body=req.body;
    if(!body.username || !body.password){
        res.send("User name and password are required")
        return;
    }
    next();
}

module.exports=router;