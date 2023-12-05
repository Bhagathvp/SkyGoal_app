const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  // console.log(req.headers)
  // console.log(req.body)
  // console.log(req.query)
  const token = req.headers.auth;
  if(token){
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(payload)
        req.userId = payload;
        console.log('jwt verified successfully')
        next();
    } catch (error) {
        res.status(403).json(error);
        throw new Error(error);
    }
  }else{
    res.status(403).json('token not found')
  }
  
}

module.exports = authenticator;
