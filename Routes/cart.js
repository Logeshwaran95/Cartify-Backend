
//Verifying jwt token
const { authorizeAndVerify, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//initiating router
const router = require("express").Router();

//importing user model
const Cart = require("../models/Cart");


               /**     API'S     */


// CREATE CART

/*
    * route : /cart/
    * method : POST
    * access : private
    * desc : create a product
*/

router.post("/", verifyToken, async (req, res) => {
    
    const newCart = new Cart(req.body);


    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

//PUSH PRODUCT TO CART

/*
    * route : /cart/:id
    * method : PUT
    * access : private
    * desc : push product to cart
*/

router.put("/:id",verifyToken,async (req,res) => {
    try{
        const cart = await Cart.findOne({userId:req.params.id});

        const productsId =  req.body.products.map((item) => item.productId);
        const cartProductsId = cart.products.map((item) => item.productId);

        let flag = true;
        productsId.forEach((id) => {
            if(cartProductsId.includes(id)){
                flag = false;
            }
        })

        if(!flag){
            return res.status(403).json("You can't add same product twice");
        }


        if(cart.userid === req.body.userid){
            await cart.updateOne({$push:{products:req.body.products}});
            res.status(200).json("The product has been added to cart");
        }
        else{
            res.status(403).json("You can only update your cart");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})


//GET USER CART

/**
 * route : /cart/find/:id
 * params : id
 * method : GET
 * access : public
 * desc : get user cart based on id
 */

 router.get("/find/:id",verifyToken,async(req,res) => {
    try{
        const cart = await Cart.find({userId:req.params.id});
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//GET ALL CART 
/*
    * route : /product/
    * params : none
    * method : GET
    * access : private
    * desc : get all products
*/

router.get("/",verifyToken,async(req,res) => {

    try{

        const cart = await Cart.find();
        res.status(200).json(cart);
        
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


//UPDATE CART

/**
 * route : /cart/:id
 * params : id
 * method : PUT
 * access : private
 * desc : update cart based on id
 */

// router.put("/:id",verifyToken,async (req,res) => {

//     try {
//         const updatedCart = await Cart.findByIdAndUpdate(
//             req.params.id,
//             {
//             $set:req.body
//             },
//             {new:true}
//             );
//         res.status(200).json(updatedCart);
//     }
//     catch(err){
//         res.status(500).json(err);
//         console.log(err);
//     }

// })

//DELETE A CART

/**
 * route : /cart/:id
 * params : id
 * method : DELETE
 * access : private
 * desc : delete cart based on id
 */

router.delete("/:id",verifyToken,async (req,res) => {

    const productid = req.body.productId;
    const userid = req.params.id;

    try{
        const cart = await Cart.findOne({userId:userid}); 
        if(cart.userId === userid){
            await cart.updateOne({$pull:{products:{productId:productid}}});
            res.status(200).json("The product has been deleted from cart");
        }
        else{
            res.status(403).json("You can only delete your cart");
        }
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//DELETE ALL CART

/*
    * route : /cart/deleteAll
    * params : none
    * method : DELETE
    * access : private
    * desc : delete all cart
*/

router.delete("/deleteAll",verifyToken,async (req,res) => {
    try{
        await Cart.deleteMany();
        res.status(200).json("All cart has been deleted !");
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})



module.exports = router;