const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId : {
        type:String,
        required:true,
    },
    products: [{
        productId:{
            type:String,
            required:true,
        },
        title:String,
        image:String,
        quantity:{
            type:Number,
            required:true,
            min: [1, "Quantity can't be less than 1."],
            default:1
        },
        price:Number,
        total:Number
    }]
},
    {timestamps: true}
)

module.exports = mongoose.model("Cart", cartSchema);