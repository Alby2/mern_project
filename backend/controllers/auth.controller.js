const jwt = require('jsonwebtoken');
const User = require('../models/User');
const maxAge = 3*24*60*60*1000
const createToken = (id)=>{
    return  jwt.sign({id},process.env.TOKEN_KEY,{
        expiresIn:maxAge
    })
}

module.exports.ins = async (req,res)=>{
    console.log(req.body);
    const {username,email,password} = req.body
    try{
        const user = await User.create({username,email,password})
         return res.status(200).json({user:user._id})
    }
    catch(err){
         return res.status(200).json({error:err})
    }
    
  
}
module.exports.login = async (req,res)=>{

    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge})
        res.status(200).json({message:'Je suis connexté'})
    } catch (error) {
        res.status(400).json({error})
    }

}
module.exports.logout = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/api/user')
}