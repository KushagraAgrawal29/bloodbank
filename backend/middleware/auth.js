const jwt = require("jsonwebtoken");

function auth(request,response,next) {
     try{
        const token = request.cookies.token;
        if(!token){
            return response.staus(401).json({
                success:false,
                message:"No token found",
            });
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        request.user = verified.user;

        next();
     }
     catch(error){
        console.log(error);
        return response.staus({
            success:false,
            message:"User is not authorised",
        });
     }
};

module.exports = auth;