
//Verifying jwt token
const { authorizeAndVerify, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//initiating router
const router = require("express").Router();

//importing user model
const Wishlist = require("../models/Wishlist");


               /**     API'S     */

// CREATE WISHLIST

/*
    * route : /wishlist/
    * method : POST
    * access : private
    * desc : create a wishlist
*/

router.post("/", verifyToken, async (req, res) => {
    const newWishlist = new Wishlist(req.body);
    try {
        const savedWishlist = await newWishlist.save();
        res.status(200).json(savedWishlist);
    } catch (error) {
        res.status(500).json(error);
    }
})

// ADD PRODUCT TO WISHLIST

/*
    * route : /wishlist/:id
    * method : PUT
    * access : private
    * desc : add product to wishlist
    * params : id
    * body : productId
*/

router.put("/:id",verifyToken,async (req,res) => {
    try{
        const wishlist = await Wishlist.findOne({userId:req.params.id});
        const productsId =  req.body.products.map((item) => item.productId);
        const wishlistProductsId = wishlist.products.map((item) => item.productId);

        let flag = true;
        productsId.forEach((id) => {
            if(wishlistProductsId.includes(id)){
                flag = false;
            }
        }
        )

        if(!flag){
            res.status(400).json("Product already in wishlist");
        }
        else{
            await wishlist.updateOne({$push:{products:req.body.products}});
            res.status(200).json("Product added to wishlist");
        }


    }
    catch(err){
        res.status(500).json(err);
    }
})



//GET USER WISHLIST

/**
 * route : /wishlist/find/:id
 * params : id
 * method : GET
 * access : public
 * desc : get user wishlist based on id
 */

 router.get("/find/:id",async(req,res) => {
    try{
        const wishlist = await Wishlist.find({userId:req.params.id});
        res.status(200).json(wishlist);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//GET ALL WISHLIST 
/*
    * route : /wishlist/
    * params : none
    * method : GET
    * access : private
    * desc : get all wishlist
*/

router.get("/",verifyToken,async(req,res) => {

    try{

        const wishlist = await Wishlist.find();
        res.status(200).json(wishlist);
        
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


//UPDATE WISHLIST

/**
 * route : /wishlist/:id
 * params : id
 * method : PUT
 * access : private
 * desc : update wishlist based on id
 */

// router.put("/:id",verifyToken,async (req,res) => {

//     try {
//         const updatedWishlist = await Wishlist.findByIdAndUpdate(
//             req.params.id,
//             {
//             $set:req.body
//             },
//             {new:true}
//             );
//         res.status(200).json(updatedWishlist);
//     }
//     catch(err){
//         res.status(500).json(err);
//         console.log(err);
//     }

// })

//DELETE PRODUCT FROM WISHLISTS

/**
 * route : /wishlist/:id
 * params : id
 * method : DELETE
 * access : private
 * desc : delete wishlist based on id
 */

router.delete("/",verifyToken,async (req,res) => {

    const userid = req.body.userId;
    const productid = req.body.productId;

    try{
        const wishlist = await Wishlist.findOne({userId:userid}); 
        if(wishlist.userId === userid){
            await wishlist.updateOne({$pull:{products:{productId:productid}}});
            res.status(200).json("The product has been deleted from wishlist");
        }
        else{
            res.status(403).json("You can only delete your wishlist");
        }
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//DELETE WISHLIST

/*
    * route : /wishlist/:id
    * params : id
    * method : DELETE
    * desc : delete wishlist based on userid
*/

router.delete("/:id",verifyToken,async (req,res) => {
    const userid = req.params.id;

    try{
        await Wishlist.findOneAndDelete({userId:userid});
        res.status(200).json("wishlist has been deleted !");
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


//DELETE ALL WISHLIST

/*
    * route : /wishlist/
    * params : none
    * method : DELETE
    * desc : delete all wishlist
    * access : private
*/

router.delete("/deleteAll",verifyToken,async (req,res) => {
    
        try{
            await Wishlist.deleteMany();
            res.status(200).json("all wishlist has been deleted !");
        }
        catch(err){
            res.status(500).json(err);
            console.log(err);
        }
})



module.exports = router;