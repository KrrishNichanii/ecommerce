const { User } = require('./model/User');
require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser') ;

const { createProduct } = require('./controller/Product');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');
const filterRouter = require('./routes/Filters');
const jwt = require('jsonwebtoken')


//middlewares
const allowedOrigin = 'http://localhost:5173';
server.use(cors({
  origin: allowedOrigin ,
  credentials:true ,
  exposedHeaders:['X-Total-Count']
}));

server.use(cookieParser()) ; 
server.use(express.json()); // to parse req.body

const isAuth = (req, res, next) => {
    // 1. Get the token from the request cookies
    const token = req.cookies.token;

    // 2. Check if token is present
    if (!token) {
        console.log('No token');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // 3. Verify the token
        const decoded = jwt.verify(token, 'shhhh');
        
        // 4. Attach the user information to the request object
        req.user = decoded;
        console.log('Req user in isAuth', req.user);
        
        // 5. Call the next middleware or route handler
        next();
    } catch (error) {
        // 6. Handle token verification errors (e.g., expired token)
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Unauthorized: Token is invalid' });
    }
};





server.use('/products' ,   productsRouter.router);
server.use('/categories'  ,categoriesRouter.router)
server.use('/brands'  ,  brandsRouter.router)
server.use('/users'   , usersRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart'  , cartRouter.router)
server.use('/orders'  ,  ordersRouter.router)
server.use('/filters' ,filterRouter.router) ; 

server.get('/testing' ,(req , res) => {
    console.log('Req cookies' , req.cookies);
    res.send(req.cookies)
})

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB connected')
}

server.get('/auth/test',(req, res)=>{
    console.log('Receiving test' , req.body);
    res.json({status:'success'})
})



server.listen(8086, ()=>{
    console.log('Server listening on port' , 8086) ; 
})
