
//Verifying jwt token
const { authorizeAndVerify, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//initiating router
const router = require("express").Router();

//importing user model
const Review = require("../models/Reviews");


               /**     API'S     */

// CREATE REVIEW

/*
    * route : /review/
    * method : POST
    * access : private
    * desc : create a review
*/

router.post("/", verifyToken, async (req, res) => {
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL PRODUCT REVIEWS

/**
 * route : /review/find/:id
 * params : id
 * method : GET
 * access : public
 * desc : get all reviews based on product id
 */

 router.get("/find/:id",async(req,res) => {
    try{
        const review = await Review.find({productId:req.params.id});
        res.status(200).json(review);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//GET USER REVIEW

/* 
    * route : /review/find/:id
    * params : id
    * method : GET
    * access : public
    * desc : get user review based on id
*/

router.get("/find/user/:id",async(req,res) => {
    try{
        const review = await Review.find({userId:req.params.id});
        res.status(200).json(review);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//GET ALL REVIEW 
/*
    * route : /product/
    * params : none
    * method : GET
    * access : private
    * desc : get all reviews
*/

router.get("/",verifyToken,async(req,res) => {

    try{

        const review = await Review.find();
        res.status(200).json(review);
        
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


//UPDATE REVIEW

/**
 * route : /review/user/
 * params : id
 * method : PUT
 * access : private
 * desc : update review based on id
 */

router.put("/user/update",verifyToken,async (req,res) => {

    const userId = req.body.userId;
    const productId = req.body.productId;

    try {
        const updatedReview = await Review.findOneAndUpdate(
            {
            $and : [
                    {userId:userId},
                    {productId:productId}
            ]
            },
            {
            $set:req.body
            },
            {new:true}
            );
            
        res.status(200).json(updatedReview);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }

})

//DELETE A REVIEW

/**
 * route : /review/:id
 * params : id
 * method : DELETE
 * access : private
 * desc : delete review based on id
 */

router.delete("/",verifyToken,async (req,res) => {

    const userId = req.body.userId;
    const productId = req.body.productId;

    try{
        await Review.findOneAndDelete({
            $and : [
                {userId:userId},
                {productId:productId}
            ]
        });
        res.status(200).json("Review deleted successfully");
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }

})



module.exports = router;