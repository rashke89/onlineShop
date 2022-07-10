const express = require('express');
const routes = express.Router();
const stripe = require('stripe');
const stripeLib = stripe('sk_test_51LE86WICBi42q51Nzzn6JysljOWRoBSpAn2SpItLAANNUndhbBoOC5MtgS9PTeu63eE61NaYddhg2UGkXO4QZafc00ouJ8pP3w');

routes.post('/init-payment',  async (req, res) => {
    console.log(req.body.amount);
    const payment = await stripeLib.paymentIntents.create({
        amount: req.body.amount,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true
        },
    });

    res.send(payment.client_secret);
})

module.exports = routes;
