// const JWT = require('jsonwebtoken');

// // protected route token base

// const requireSignIn = async (req,res, next) =>{
//   try {
//     const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRECT)

//     next()
    
//   } catch (error) {
//     console.log(error);
    
//   }

// }

// module.exports = {requireSignIn}
const userModel = require('../Models/userModel');
const JWT = require('jsonwebtoken');

// Protected route token base
const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }

    const decodedToken = JWT.verify(token, process.env.JWT_SECRECT);

    // Attach the decoded token to the request object for further use
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token." });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired." });
    }

    res.status(500).json({ error: "Internal server error." });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized access"
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { requireSignIn, isAdmin };
