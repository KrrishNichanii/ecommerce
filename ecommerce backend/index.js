// const express = require('express') ; 
// const mongoose = require('mongoose') ;
// const server = express() ; 
// const cors = require('cors') ;
// const session = require('express-session') ;
const passport = require('passport') ; 

// const productsRouter = require('./routes/Products');
// const categoriesRouter = require('./routes/Category');
// const brandsRouter = require('./routes/Brand');
// const userRouter = require('./routes/User');
// const authRouter = require('./routes/Auth');
// const cartRouter = require('./routes/Cart')
// const orderRouter = require('./routes/Order');
const { User } = require('./model/User');
const LocalStrategy = require('passport-local').Strategy;
// const crypto  = require('crypto');
// const cookieParser = require('cookie-parser') ; 
// const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt ; 
// const opts = {} ;
// opts.jwtFromRequest = cookieExtractor ; 
// opts.secretOrKey = 'SECRET_KEY'
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'SECRET_KEY' ;
// const token = jwt.sign({foo:'bar'},SECRET_KEY);
// const path = require('path');





// //middlewares
//  server.use(express.static('dist'))
//  server.use(express.static(path.join(__dirname, '/dist')));
// server.use(cookieParser()) ; 
// server.use(session({
//     secret: 'keyboard cat' ,
//     resave: false , 
//     saveUninitialized: false ,
// }))
// server.use(passport.authenticate('session')) ; 


// server.use(cors({
//     exposedHeaders:['X-Total-Count']
// })) ;
// server.use(express.json()) ; // to parse req.body
// server.use('/products' ,isAuth() , productsRouter.router)
// server.use('/brands' ,isAuth(), brandsRouter.router)
// server.use('/categories' ,isAuth(), categoriesRouter.router)
// server.use('/users' , userRouter.router)
// server.use('/auth' , authRouter.router)
// server.use('/cart' ,isAuth(), cartRouter.router)



//Passport Strategy
// passport.use('local',new LocalStrategy(
//     {usernameField:'email'} ,
//     async function(email , password , done) {
//         try {
//             const user = await  User.findOne({email:email});
//             if(!user) {
//               return   done(null,false , { message : 'Incorrect username or password'});
//             }
//             crypto.pbkdf2(
//                 password ,
//                 user.salt ,
//                 310000,
//                 32,
//                 'sha256',
//                 async function (err , hashedPassword){
                    
//                     if(!crypto.timingSafeEqual(user.password , hashedPassword)){
//                        return  done(null,false , { message : 'invalid credentials'});
//                     }
//                        const token = jwt.sign(sanitizeUser(user) , SECRET_KEY) ; 
//                         done(null,{token}) ; // calls serialize user
                    
//                 }
//             )
            
            
//         } catch (error) {
//             done(error);
//         }
//     }
// )) ; 

// passport.use(
//     'jwt',
//     new JwtStrategy(opts, async function (jwt_payload, done) {
//         try {
//             const user = await User.findById( jwt_payload.id);
//            // console.log("JWT payload ", jwt_payload );
//         if (user) {
//           return done(null, sanitizeUser(user)); // this calls serializer
//         } else {
//           return done(null, false);
//         }
//       } catch (err) {
//         return done(err, false);
//       }
//     })
//   );


// //this creates session variable req.user on being called
// passport.serializeUser(function (user , done){
//     console.log('serialize ',user);
//     process.nextTick(function (){
//         return done(null ,{id:user.id , role:user.role})
//     })
// })

// //this change session variable req.user when called from authorized request
// passport.deserializeUser(function (user , done){
//     console.log('de-serialize ',user);
//     process.nextTick(function () {
//         return done(null , user) ; 
//     })
// })

// server.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//   });

// main().catch(err => console.log(err)) ; 
// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
//     console.log('DB connected');
// }



// server.listen(8086 , () => {
//     console.log('Server started on port' ,8086);
// })

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
const  isAuth = (req, res, next) => {
   
  
    // 1. Get the token from the request headers or cookies
    console.log(req.cookies);
    let token =  req.cookies.token;
    //setting token manually to check remove later
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjI3NTQ1ZmZjNTU5YTI1MWQyOTJmNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMzYzMzIwMCwiZXhwIjoxNzEzNjQwNDAwfQ.ZMl_XHlDWbUkozQL3ipL0T9bEQ-by18gm7SRnAm6gyQ"
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
        console.log('Req user in isAuth' , req.user);
        // 5. Call the next middleware or route handler
        next();
    } catch (error) {
        // 6. Handle token verification errors (e.g., expired token)
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Unauthorized: Token is invalid' });
    }
  };

server.use('/products' ,isAuth , productsRouter.router);
server.use('/categories',isAuth , categoriesRouter.router)
server.use('/brands',isAuth ,  brandsRouter.router)
server.use('/users'  ,isAuth , usersRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart' ,isAuth ,   cartRouter.router)
server.use('/orders'  ,isAuth , ordersRouter.router)

server.get('/testing' , (req , res) => {
    console.log('Req cookies' , req.cookies);
    res.send(req.cookies)
})
main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log('DB connected')
}

server.get('/auth/test',(req, res)=>{
    console.log('Receiving test' , req.body);
    res.json({status:'success'})
})



server.listen(8086, ()=>{
    console.log('Server listening on port' , 8086) ; 
})

