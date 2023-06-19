const express =require('express');
const userController =require('../controllers/userController');
const auth = require('../middlewares/auth');
//router object
 const router =express.Router();

 //Register User
 router.post('/register',userController.registerUser)
 //Login User
 router.post('/login',userController.loginUser)
//verify Token
router.get('/verify',userController.verifiedToken)
//Logout
router.post("/logout",userController.logoutUser)
 module.exports =router
 