
const { User } = require('../model/User');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const options = {
  httpOnly: true, 
  secure: true, 
  sameSite: 'Strict', 
  maxAge: 24 * 60 * 60 * 1000
};

exports.createUser = async (req, res) => {
  try {
    console.log('Req body ',req.body);
    //get data from body
    const {email , password , role , addresses } = req.body ; 
    //all the data should exist
    if(!(email && password && role && addresses )){
        return res.status(400).send('All fields are compulsory') ; 
    }
    // check if user already exists -email
    const existingUser = await User.findOne({email})
    if(existingUser){
       return res.status(400).json({err: true , message: "User already exists"}) ; 
    }

    //encrypt the password
    const myEncPassword = await bcrypt.hash(password ,10 ) ; 
    
    //save the user in DB
    const user = await User.create({
      email , 
      addresses , 
      role , 
      password : myEncPassword ,
      recommended:[]
    })

    //generate a token for user and send it
    const token = jwt.sign(
      {id: user.id ,role: user.role} ,
      'shhhh' ,
      {
        expiresIn: "2h"
      }
    )

    user.token = token ; 
    user.password = undefined ;

    // return res.status(201).json({id:user.id,role:user.role});
    console.log('Sending this user Info ',{id:user.id, role:user.role});
    return res.status(201).cookie("token" , token , options).json({id:user.id, role:user.role}) ; 
    
  } catch (error) {
    console.log('Error in create user ',error);
    return res.status(401).json(error) ; 
  }
};

exports.loginUser = async (req, res) => {

  try {
    //get all data from body
    const {email , password} = req.body
    if(!(email && password)){
       res.status(400).send('send all fields')
    }

    //find user in DB
    const user = await User.findOne({email}) ; 

    if(!user){
      res.status(401).json({ message: 'User not found' }) ; 
    }

    //match the password
    if((await bcrypt.compare(password , user.password))){
      const token = jwt.sign(
        {id:user.id , role: user.role} , 
        'shhhh' , 
        {
          expiresIn: '2h'
        }
       ) ; 
       user.token = token ; 
       user.password = undefined ; 

       //cookie section
       const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) , 
        httpOnly: true 
      } ;
      //console.log('logging in user');
      res.status(200).cookie("token" , token , options).json({id:user.id, role:user.role}) ; 
    }
    else res.status(401).json({ message: 'invalid credentials' })
    
  } catch (error) {
    console.log('Error in login ',error);
  }

  
};

exports.logout = (req, res) => {
  // Clear the 'token' cookie
  res.clearCookie('token', { path: '/' }); // Replace 'token' with your cookie name

  // Send a response indicating successful logout
  res.status(200).json({ message: 'User logged out successfully' });
};

exports.checkAuth = async (req, res) => {
   if(req.user){
    res.json(req.user) ; 
   }
   else res.sendStatus(401) ; 
};