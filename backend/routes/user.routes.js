const router = require('express').Router()
const userCntrl = require('../controllers/user.controller')
const followCntrl = require('../controllers/follow.controller')


router.get('/',userCntrl.allUser);
router.get('/:id',userCntrl.oneUser);
router.put('/:id',userCntrl.updateUser);
router.delete('/:id',userCntrl.deleteUser);


//  Abonnement et   Abonne voir
router.get('/:id/abonne',userCntrl.abonne)
router.get('/:id/abonnement',userCntrl.abonnement)


router.patch('/follow/:id',followCntrl.follow)
router.patch('/unfollow/:id',followCntrl.unfollow)




module.exports =router

