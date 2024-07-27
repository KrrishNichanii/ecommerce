
const passport = require('passport');



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