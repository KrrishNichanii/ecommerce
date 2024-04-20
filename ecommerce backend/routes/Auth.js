// const express = require('express') ; 
// const { createUser ,loginUser, checkUser } = require('../controller/Auth');
// const router = express.Router() ; 
const passport = require('passport');


// router.post('/signup',createUser) 
//       .post('/login' ,passport.authenticate("local"), loginUser)
//       .get('/check' ,passport.authenticate("jwt"),  checkUser)
// exports.router = router ; 
const express = require('express');
const { createUser, loginUser, logout, checkAuth } = require('../controller/Auth');

const router = express.Router();
//  /auth is already added in base path
router
.post('/signup', createUser)
.post('/login',  loginUser)
.get('/logout' ,logout)
.get('/check',checkAuth)

exports.router = router;