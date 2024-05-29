const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey';
const User = require('../models/user.model')


  
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
console.log('Verifying token', token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const verified = jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ message: "Invalid token" });
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      req.user = {
        id: user._id,
        email: user.email,
        name : user.name,
        password : user.password
       
      };

      next();
    });
    console.log('Verified user:', verified);
  } catch (error) {
    console.error('Error in verifyToken middleware:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = verifyToken;

