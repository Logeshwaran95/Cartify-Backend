
//Verifying jwt token
const { authorizeAndVerify, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//initiating router
const router = require("express").Router();

//importing user model
const Order = require("../models/Order");


               /**     API'S     */

// CREATE Order

/*
    * route : /order/
    * method : POST
    * access : private
    * desc : create an order
*/

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET USER ORDER
/*
    * route : /order/find/:id
    * params : id
    * method : GET
    * access : private
    * desc : get user order based on id
*/

router.get("/find/:id",verifyToken,async(req,res) => {
    try{
        const order = await Order.find( { userid : { $all: [ req.params.id ] } } )
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})    

//GET ALL ORDERS
/*
    * route : /order/
    * params : none
    * method : GET
    * access : private
    * desc : get all orders
*/

router.get("/",verifyToken,async(req,res) => {

    try{

        const orders = await Order.find();
        res.status(200).json(orders);
        
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


//UPDATE ORDER

/**
 * route : /order/:id
 * params : id
 * method : PUT
 * access : private
 * desc : update order based on id
 */

router.put("/:id",verifyToken,async (req,res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
            $set:req.body
            },
            {new:true}
            );
        res.status(200).json(updatedOrder);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }

})

//DELETE AN ORDER

/**
 * route : /order/:id
 * params : id
 * method : DELETE
 * access : private
 * desc : delete order based on id
 */

router.delete("/:id",verifyToken,async (req,res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted !");
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})



module.exports = router;