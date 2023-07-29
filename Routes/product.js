
//Verifying jwt token
const { authorizeAndVerify, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//initiating router
const router = require("express").Router();

//importing user model
const Product = require("../models/Product");

//importing crypto-js for hashing password
const CryptoJs = require("crypto-js");


               /**     API'S     */

// CREATE PRODUCT

/*
    * route : /product/
    * method : POST
    * access : private
    * desc : create a product
*/

router.post("/", verifyToken, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET A PRODUCT

/**
 * route : /product/find/:id
 * params : id
 * method : GET
 * access : public
 * desc : get product based on id
 */

 router.get("/find/:id",async(req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//SEARCH PRODUCT
/*
    * route : /product/search
    * params : none
    * method : GET
    * access : public
    * desc : search product based on name
    * query : name
    * example : /product/search?name=apple
*/

router.get("/search/:query",async(req,res) => {
    const qName = req.params.query;
    try{
        const products = await Product.find({
            title:{
                $regex:qName,
                $options:"i"
            }
        });
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});


//GET ALL PRODUCT 
/*
    * route : /product/
    * params : none
    * method : GET
    * access : public
    * desc : get all products
*/

router.get("/",async(req,res) => {
    
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try{
        const products = qNew ? await Product.find().sort({createdAt:-1}).limit(5) 
        : qCategory ? await Product.find({categories:{
            $in:[qCategory]
        }})
         : await Product.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//UPDATE PRODUCT

/**
 * route : /product/:id
 * params : id
 * method : PUT
 * access : private
 * desc : update user based on id
 */

// router.put("/:id",verifyToken,async (req,res) => {

//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
//             $set: {
//                 rating:req.body.rating,
//                 numReviews:req.body.numReviews,
//             }
//         },{new:true});
//         res.status(200).json(updatedProduct);
        
//     }
//     catch(err){
//         res.status(500).json(err);
//         console.log(err);
//     }

// })

//UPDATE REVIEWS OF PRODUCT

/*

 * route : /product/:id/reviews
 * params : id
 * method : PUT
 * access : private
 * desc : update reviews of product based on id
 * body : rating,comment
 * example : {
 *     rating:5,    
 *    comment:"good product"
 * }
 * 
*/




//DELETE A PRODUCT

/**
 * route : /product/:id
 * params : id
 * method : DELETE
 * access : private
 * desc : delete product based on id
 */

router.delete("/:id",verifyToken,async (req,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted !");
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


// Route: /product/search
// Method: POST
// Access: Public
// Description: Search for a product that includes any subset of strings in its categories array

router.get("/suggest", async (req, res) => {
    const { categories } = req.body;
  
    try {
      const products = await Product.find({
        categories: {
            $in: Array.isArray(categories) ? categories : [categories], // Matches any product with at least one category that matches any element in the categories array
          },
      });
  
      res.status(200).json(products);
      console.log(products.length)
    } catch (error) {
      res.status(500).json(error);
    }
  });

// Route: /product/getsuggest
// Method: GET
// Access: Public
// Description: gets suggest products

router.get("/suggest/:key1/:key2",async(req,res) => { 

    const key1 = req.params.key1;
    const key2 = req.params.key2;

    try{

                const products = await Product.find({
                    categories:{
                        $in:[key1,key2]
                    }
                });
                res.status(200).json(products);
                console.log(products.length);

    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});



module.exports = router;