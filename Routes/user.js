
//Verifying jwt token
const { authorizeAndVerify, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//initiating router
const router = require("express").Router();

//importing user model
const User = require("../models/User");

//importing crypto-js for hashing password
const CryptoJs = require("crypto-js");


               /**     API'S     */

// CREATE USER
// user will be created during registration/signup

//GET A USER

/**
 * route : /user/find/:id
 * params : id
 * method : GET
 * access : private
 * desc : get user based on id
 */

 router.get("/find/:id",verifyToken,async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,...exceptPassword} = user._doc;
        res.status(200).json(exceptPassword);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//GET ALL USER 
/*
    * route : /user/
    * params : none
    * method : GET
    * access : private
    * desc : get all user
*/

router.get("/",verifyToken,async(req,res) => {
    
    //returns latest user first
    const query = req.query.new;

    try{
        const users = query? 
        await User.find().sort({_id:-1}).limit(1) 
        : await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//UPDATE USER

/**
 * route : /user/:id
 * params : id
 * method : PUT
 * access : private
 * desc : update user based on id
 */

router.put("/:id",verifyToken,async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});

        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }

})

//DELETE USER

/**
 * route : /user/:id
 * params : id
 * method : DELETE
 * access : private
 * desc : delete user based on id
 */

router.delete("/:id",verifyToken,async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted !");
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


//GET USER STATISTICS
/*
    * route : /user/stats
    * params : none
    * method : GET
    * access : private
    * desc : get user statistics
*/

// router.get("/stats",verifyToken,async(req,res) => {

//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    
//     try{
//         const data = await User.aggregate([
//             {$match: {createdAt: {$gte: lastYear}}},
//             {
//                 $project:{
//                     month: {$month: "$createdAt"}
//                 }
//             },
//             {
//                 $group:{
//                     id: "$month",
//                     total: {$sum: 1}
//                 }
//             }
//         ])
//         res.status(200).json(data);
//     }
//     catch(err){
//         res.status(500).json(err);
//         console.log(err);
//     }

// });



module.exports = router;