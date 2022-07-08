const express = require('express');
const routes = express.Router();

const stripe = require('stripe');
const stripeSK = stripe('sk_test_wQY1TbOYm33R21qhEG4p3geQ00lHwVVZCt');

routes.post('/init-payment', async (req, res) => {
console.log(req.body);
    const secretKey = await stripeSK.paymentIntents.create({
        amount: req.body.amount,
        currency: req.body.currency,
        automatic_payment_methods: {
            enabled: true
        }
    });
    res.send(secretKey.client_secret)
});

module.exports = routes;