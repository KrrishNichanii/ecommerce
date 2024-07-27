const passport = require('passport');
const jwt = require('jsonwebtoken') ; 

exports.isAuth = (req, res, done) => {
  // if(req.user)
  // console.log('Req',req.user);
  // return passport.authenticate('jwt')

  // 1. Get the token from the request headers or cookies
  const token =  req.cookies.token;

  // 2. Check if token is present
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
      // 3. Verify the token
      const decoded = jwt.verify(token, 'shhhh');
      
      // 4. Attach the user information to the request object
      req.user = decoded;
      console.log('Req user ' , req.user);
      // 5. Call the next middleware or route handler
      next();
  } catch (error) {
      // 6. Handle token verification errors (e.g., expired token)
      console.error('Token verification failed:', error);
      return res.status(403).json({ message: 'Unauthorized: Token is invalid' });
  }
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function(req) {
    var token = null ; 

    if(req && req.cookies){
      token = req.cookies['jwt'] ;
    }
    return token ; 
}