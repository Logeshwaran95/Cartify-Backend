const mongoose = require("mongoose");

//product schema
/*
    title
    shortDescription
    description
    image
    gallery
    categories
    sizeAvailability
    colorAvailability
    originalPrice
    currentPrice
    countInStock
*/

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        unique:true
    },
    shortDescription : {
        type:String,
        required:true,
    },
    description : {
        type:String,
        required:true,
    },
    image : {
        type:String,
        required:true,
    },
    gallery : {
        type:Array,
    },
    categories : {
        type:Array,
    },
    size : {
        type:String,
    },
    sizeAvailability:{
        type:Array,
    },
    color:{
        type:String,
    },
    colorAvailability:{
        type:Array,
    },
    originalPrice:{
        type:Number,
        required:true
    },
    currentPrice : {
        type:Number,
        required:true
    },
    countInStock : {
        type:Number,
        required:true
    },
    rating : {
        type:Number,
        default:0
    },
    numReviews : {
        type:Number,
        default:0
    },
    reviews : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reviews'
    }],
    offers : [{
        account : {
            type:String,
        },
        discount : {
            type:Number,
        },
        preCondition : {
            type:String,
        },
        validity : {
            type:String,
        }
    }]
    
},
    {timestamps:true}
)

module.exports = mongoose.model("Product",productSchema);