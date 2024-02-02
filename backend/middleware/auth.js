const jwt = require("jsonwebtoken");

function auth(req,res,next) {
     try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token found",
            });
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified.user;
        next();
     }
     catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User is not authorised",
        });
     }
};

module.exports = { auth };