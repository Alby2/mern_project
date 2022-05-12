const User = require("../models/User")
const verifyId = require('mongoose').Types.ObjectId

module.exports.allUser = async (req,res) =>{
    const users = await User.find().select('-password');
     return res.status(200).json(users)
}


module.exports.oneUser = async (req,res)=>{
    if (!verifyId.isValid(req.params.id)) {
         return res.status(400).json({message:"Id invalide"})
    }
    try {
         User.findById(req.params.id,{},(err,data)=>{
            if(err || data == null){
               return   res.status(400).json({error:'Utilisateur inexistant'})
            } 
            return   res.status(200).json(data)
        }).select('-password')
    } catch (err) {
         return res.status(400).json({err})
    }
}


module.exports.updateUser = async (req,res) =>{
    const {desc,city,from} = req.body
   if (!verifyId.isValid(req.params.id)) {
        return res.status(400).json({error:"Id invalide"})
   }
   try {
       User.findByIdAndUpdate(req.params.id,{$set:{desc,city,from}},{upsert:true,setDefaultsOnInsert:true,new:true},(err,data)=>{
           if (err || data == null) {
                return res.status(400).json({error:'Modification echouée'})
           }
            return res.status(200).json({data})
       })
   } catch (error) {
        return res.status(400).json(error)
   }
}

module.exports.deleteUser = async (req,res) =>{
    if (!verifyId.isValid(req.params.id)) {
         return res.status(400).json({error:"Id invalide"})
    }
    try {
        await User.remove({_id:req.params.id}).exec()
         return res.status(200).json({message:'Utilisateur '+req.params.id+' supprimé '})
    } catch (error) {
         return res.status(400).json({error})
        
    }
}

module.exports.abonnement = async (req,res)=>{
    if (!verifyId.isValid(req.params.id)) {
         return res.status(400).json({message:"Id invalide"})
    }
    try {
        User.findById(req.params.id,{},(err,data)=>{
            if(err || data == null){
                 return res.status(400).json({error:'Utilisateur inexistant'})
            } 
             return res.status(200).json(data)
        }).select('followings')
    } catch (err) {
         return res.status(400).json({err})
    }
}
module.exports.abonne = async (req,res)=>{
    if (!verifyId.isValid(req.params.id)) {
         return res.status(400).json({message:"Id invalide"})
    }
    try {
        User.findById(req.params.id,{},(err,data)=>{
            if(err || data == null){
                 return res.status(400).json({error:'Utilisateur inexistant'})
            } 
             return res.status(200).json(data)
        }).select('followers')
    } catch (err) {
         return res.status(400).json({err})
    }
}
