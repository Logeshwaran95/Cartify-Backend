//setting up required modules and packages

//express for routing
var express = require('express');

//cors for cross origin resource sharing
var cors = require('cors');

//mongoose for mongodb
var mongoose = require('mongoose');

//dotenv for environment variables
var dotenv = require('dotenv');

//routes 
const userRoute = require('./Routes/user');
const productRoute = require('./Routes/product');
const orderRoute = require('./Routes/order');
const cartRoute = require('./Routes/cart');
const reviewRoute = require('./Routes/reviews');
const wishlistRoute = require('./Routes/wishlist');

const authRoute = require('./Routes/auth');

const stripeRoute = require('./Routes/stripe');





dotenv.config();

//creating express app
const app = express();
app.use(cors());
app.use(express.json());


// app.use('/',function(req,res){
//     res.send('<center><h1>Welcome to Cartify Backend</h1></center>');
//     return;
// });
app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/order',orderRoute);
app.use('/cart',cartRoute);
app.use('/review',reviewRoute);
app.use('/wishlist',wishlistRoute);

app.use('/auth',authRoute);
app.use('/checkout',stripeRoute);

//setting up mongodb connection
mongoose.
        connect(process.env.MONGO_URL)
        .then(() => console.log('Connected to MongoDB...'))
        .catch((err) => {
            console.log('Could not connect to MongoDB...');
            console.log(err);
        });


//setting up port
const port = 4000 || process.env.PORT;


//starting server
app.listen(port,() => {
    console.log(`Backend Server is running on port ${port}`);
});