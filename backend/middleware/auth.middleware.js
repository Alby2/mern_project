const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.checkAuth = (req,res,next) =>{
    const token = req.cookies.jwt
    console.log(token)
    if (token) {
        jwt.verify(token,process.env.TOKEN_KEY,async (err,encode)=>{
            if (err || encode == null || encode =='') {
                res.locals.user=null
                res.cookie('jwt','',{maxAge:1});
                console.log('fake token');
                next();
            } else {
                console.log(encode);
                const user = await User.findById(encode.id)
                res.locals.user = user
                console.log('correct token');

                next();
            }
        })
    }else{
        console.log('no token')
        res.locals.user = null
        next();
    }
    
}
module.exports.verifyAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token,process.env.TOKEN_KEY, async(err,code)=>{
            if (err || code == null || code =='') {
                res.locals.user=null
                res.cookie('jwt','',{maxAge:1});
                res.status(400).json({error:'fake token'})
            }else{
                console.log(code);
                res.status(200).json({id:code.id})
            }
        })
    } else {
        
        res.status(400).json({error:'no token'})
 
    }
}