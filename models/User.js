const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    email : {
        type:String,
        required: true,
        unique:true
    },
    isAdmin : {
        type:Boolean,
        default:false
    },
    profilePicture : {
        type:String,
    },
    address : {
        type:String,
    },
    city : {
        type:String,
    },
    country : {
        type:String,
    },
    phoneNumber : {
        type:String,
    }
}, 
    {timestamps: true}
)

module.exports  = mongoose.model("User", userSchema);