const stripe=require('stripe')
const stripeLib=stripe('sk_test_51LG51YFqRcJByTttlkcybnszINvBSb2yCOU9ZC06JePvPTojDuYuHW2kZE8Ljo9pTsHNfadedqQYjcwlYmrtzSXo0042yC56t0');

const initPayment=async (req,res)=>{
    //Backend send SK to Stripe
const payment= await stripeLib.paymentIntents.create({
    amount:req.body.amount,
    currency:"eur",
    automatic_payment_methods:{
        enabled:true
    },
});

res.send(payment.client_secret);

}


module.exports={
    initPayment
}