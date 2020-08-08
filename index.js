const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')


dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT
,{ useUnifiedTopology: true, useNewUrlParser: true} ,
()=> {
    console.log("connected to db");
})


//middleware
app.use(express.json())


//use Middleware

app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.get("/", (req, res)=> {
    res.send("Up and Running")
})

app.listen(3000, ()=>{
    console.log('Server Up and runing')
});