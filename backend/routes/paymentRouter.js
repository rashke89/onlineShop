const express=require('express')
const router=express.Router();
const {initPayment}= require('./../controllers/paymentController')

router.post('/init-payment',initPayment)

module.exports=router;