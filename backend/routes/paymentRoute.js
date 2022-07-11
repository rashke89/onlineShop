const express = require('express');
const routes = express.Router();
const stripe = require('stripe');
const stripeLib = stripe('sk_test_51LIxQ0GspIrbt6HI5NdG2DbWTuPysoJcvfZX7AbfWgvARmuZw64LgagSNrdWYC3b9vgijVoqZ53dAG2arMWOA3VU002ZsldfNp')

routes.post('/init-payment', async (req, res) => {
	const payment = await stripeLib.paymentIntents.create({
		amount: req.body.amount,
		currency: 'eur',
		automatic_payment_methods: {
			enabled: true
		}
	});
	res.send(payment.client_secret);
})

module.exports = routes;