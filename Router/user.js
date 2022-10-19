 var express=require('express')
 var router=express.Router()

 const controller=require('../Controllers/userController')

router.get('/',controller.getAllUsers)
router.get('/:id',controller.getAllOrdersByUserId)
router.get('/:email/:password',controller.getUserByEmailAndPassword)
router.post('/',controller.postUser)
router.put('/:id',controller.putUser)
router.delete('/:id',controller.deleteUser)
  
module.exports=router;