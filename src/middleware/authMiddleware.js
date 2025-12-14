const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleWare = (req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.status(401).json({message: "Unautorized and token not found"});
    }

    const decodedToken = jwt.verify(token, process.env.JWT_secrets);

    if(!decodedToken){
        return res.status(401).json({message: "Invalid token"});
    }

    req.user = decodedToken;
    
    next();
}

module.exports = authMiddleWare;