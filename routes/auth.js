const router = require('express').Router();
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{ registerVaildation, loginVaildation} = require('../validation')


router.post('/register', async(req, res) => {
    
    //validate the data
    const {error} = registerVaildation(req.body)
    if(error) return  res.status(400).send(error.details[0].message);

    //check if user exists
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send("email exists");


    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    

    const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save()
        res.send({user: user._id})
    }catch (err){
        res.status(400).send(err)
    }
});


router.post('/login', async (req, res) =>{

    //validate the data
    const {error} = loginVaildation(req.body)
    if(error) return  res.status(400).send(error.details[0].message);

    // check if the email exists
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("email or password is wrong");

    //PASSWORD CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("invalid password")

    //create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
    
    // res.send("your logined in")
})


module.exports = router;
