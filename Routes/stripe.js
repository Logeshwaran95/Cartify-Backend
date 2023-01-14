// const dotenv = require('dotenv');

// dotenv.config()l


require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SEC);
const router = require("express").Router();

//MAKING PAYMENT
/*
    ROUTE : /checkout/payment
    METHOD : POST
*/

router.post("/payment", async (req, res) => {
    // stripe.charges.create(
    //     {
    //         source: req.body.tokenId,
    //         amount: req.body.amount,
    //         currency: "usd",
    //     },
    //     (stripeErr, stripeRes) => {
    //         if (stripeErr) {
    //             res.status(500).send({ error: stripeErr });
    //         } else {
    //             res.status(200).send({ success: stripeRes });
    //         }
    //     }
    //     );
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            payment_method :'pm_card_visa',
            description : "Testing payment"
        })

        if(!paymentIntent){
            throw new Error("Payment Failed");
        }

        res.status(200).json({
            paymentIntent,
            message:"Payment Successful"
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
        console.log(err);
    }
    });

module.exports = router;