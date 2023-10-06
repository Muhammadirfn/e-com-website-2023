const express = require('express');
const {registerController, loginController, testController, forgetPasswordController, updateprofileController, getorderController, getallorderController, statusController} = require('../controllers/registerController');
const {requireSignIn, isAdmin} = require('../middleware/authMiddleware')

// Routing object
const router = express.Router();

router.post('/register', registerController); 

// post login

router.post('/login', loginController)


//  forget password

router.post('/forget-password', forgetPasswordController)

// test controller
router.get('/test',requireSignIn,isAdmin, testController)

//  protected user route

router.get('/user-auth', requireSignIn, (req,res) =>{
  res.status(200).send({ok: true})
})
//  protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) =>{
  res.status(200).send({ok: true})
})

// update profile 
router.put('/profile', requireSignIn, updateprofileController)

// for orders 
router.get('/orders', requireSignIn, getorderController)
// get All orders
router.get('/all-orders', requireSignIn, isAdmin,getallorderController)
//  for ststus udating
router.put('/status/:orderId', requireSignIn, isAdmin,statusController)


module.exports = router;
