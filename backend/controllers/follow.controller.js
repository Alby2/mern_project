const User = require("../models/User")
const verifyIf = require("mongoose").Types.ObjectId

module.exports.follow = async (req,res)=>{
    // req.params.id est l'id de la personne qui veut suivre c'est à dire la personne qui fait l'action 
    // req.body.id est l'id de la personne qu'on veut suivren c'est à dire le profil sur lequel on appuie
   

    if ( !verifyIf.isValid(req.params.id)  || !verifyIf.isValid(req.body.id)) {
         res.status(400).json({message:'Id invalide'})
    }
    try {
       
        await User.findByIdAndUpdate(
            req.body.id,
            {$addToSet:{followers:req.params.id}},
            {new:true,upsert:true},
            (err,data)=>{
                if (err || data == null) {
                     res.status(400).json({message:'Utilisateur introuvable'})
                }else{
                    res.status(200).json(data)
                }
            }
        )
        
    } catch (error) {
         res.status(400).json(error)
    }
}


module.exports.unfollow = async(req,res)=>{
    // req.params.id est l'id de la personne qui veut suivre c'est à dire la personne qui fait l'action 
    // req.body.id est l'id de la personne qu'on veut suivren c'est à dire le profil sur lequel on appuie
    try {
        if ( !verifyIf.isValid(req.params.id)  || !verifyIf.isValid(req.body.id)) {
            return res.status(400).json({message:'Id invalide'})
        }
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull:{followers:req.params.id}
            },
            {upsert:true,new:true},
            (err,data)=>{
                if (err || data == null) {
                    return res.status(400).json({message:'Utilisateur introuvable'})
                }
            }
        )
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $pull:{followings:req.body.id}
            },
            {upsert:true,new:true},
            (err,data)=>{
                if (err || data == null) {
                    return res.status(400).json({message:'Utilisateur introuvable'})
                }
                return res.status(201).json('L\' utilisateur '+req.params.id+' vient de suivre avec succes l\'utilisateur '+req.body.id+' ')
            }
        )
    } catch (error) {
       return res.status(400).json(error)
    }
}