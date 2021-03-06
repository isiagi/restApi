const jwt = require('jsonwebtoken');

module.exports ={ 
    Verify : function (req, res, next) {
    //check if you ave the token
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
 
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    }catch (err){
        res.status(400).send('Invalid token')
    }
},
signToken: (user)=>{
    const token =jwt.sign(
        {_id: user.id}, 
        process.env.TOKEN_SECRET,
        {expiresIn: '24hr'}
        )
    return token
    }

}