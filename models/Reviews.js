const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    rating : {
        type:Number,
        required:true
    },
    review: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Review", reviewSchema);