const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    userid:{
        type:String,
        required:true,
    },
    orderDate :{
        type:Date,
        required:true
    },
    orderStatus:{
        type:String,
        required:true,
    },
    numberOfItems:{
        type:Number,
        required:true,
    },
    subtotal:{
        type:Number,
        required:true,
    },
    tax:{
        type:Number,
        required:true,
    },
    shipping:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    DeliveryInfo:{

        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        postcode:{
            type:Number,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        }

    },
    products:[{
        productId:{
            type:String
        },
        title:String,
        image:String,
        quantity:{
            type:Number,
            required:true,
            min: [1, "Quantity can't be less than 1."],
            default:1
        },
        subtotal:{
            type:Number,
            required:true,
        },
        tax:{
            type:Number,
            required:true,
        },
        shipping:{
            type:Number,
            required:true,
        },
        total:{
            type:Number,
            required:true,
        },
        arrivalStatus:{
            type:String,
            required:true,
        }
    }],

    

},{
    timestamps:true
})

module.exports = mongoose.model("Order", orderSchema);