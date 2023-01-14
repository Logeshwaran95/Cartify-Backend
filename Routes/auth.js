const Router = require("express").Router();

//json web tokens for authorization and information exchange
//consists of three parts separated by dots
//header --> payload --> signature
const jwt = require("jsonwebtoken");

//models
const User = require("../models/User");



//encrytion
const cryptoJs = require("crypto-js");

//register user
Router.post("/register", async (req, res) => {
    
    //find if username or email already exists
    const userName = await User.findOne({username: req.body.username});
    const userEmail = await User.findOne({email: req.body.email});

    if(userName){
        return res.status(400).json("Username already exists");
    }
    if(userEmail){
        return res.status(400).json("Email already exists");
    }

    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            
            //encrypting password
            //The Advanced Encryption Standard (AES) is a U.S. Federal Information Processing Standard (FIPS). 
            //It was selected after a 5-year process where 15 competing designs were evaluated.
            password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        })
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }

});

//login user

Router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        //if user not found
        if(!user){
            return res.status(404).json("User not found");
        }

        const hashedPassword = new cryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
        const savedPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
        
        //if password doesnt match
        if(savedPassword !== req.body.password){
            return res.status(400).json("Wrong password");
        } 

        //now user is authenticated here

        //creating a token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, 
        {expiresIn: "3d"});   //3 days validity

        const {password,...exceptPassword} = user._doc;
        res.status(200).json({...exceptPassword,accessToken});

    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//Logout user




module.exports = Router;