const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    products : [
        {
            productId:{
                type:String,
                required:true
            },
            title:{
                type:String,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            }
        }
    ]
})

module.exports = mongoose.model("Wishlist", wishlistSchema);