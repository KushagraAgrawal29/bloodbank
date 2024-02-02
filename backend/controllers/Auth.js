const User = require("../models/User");
const Bloodbank = require("../models/Bloodbank");
const bcrypt = require("bcrypt");

exports.registerUser = async(req,res) => {
    try {
        //validation
        const handle = req.params.handle;
        const existingUser = handle == "bank" ? 
            await Bloodbank.findOne({
                phone: req.body.phone
            }) : 
            await User.findOne({
                phone: req.body.phone
            });

            if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:"User with this email id is already registered",
                });
            }

            //hashing password

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(req.body.password,salt);
            req.body.password = passwordHash;

            //save new user account to db
            const newUser = handle == "bank" ? new Bloodbank(req.body) : new User(req.body);
            const saveUser = await newUser.save();

            //sign the token
            const token = jwt.sign({ user: saveUser._id, type: handle }, process.env.JWT_SECRET);

            //Send token in http cookie only

            res.cookie("token",token, {
                httpOnly: true,
                secure: true,
                sameSite:"none",
            }).send();
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Unable to register user"
        })
    }
}

exports.login = async(req,res) => {
    try{
        const { phone,password } = req.body;

        if(!phone || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are mandatory",
            });
        }

        const handle = req.params.handle;
        const existingUser = await (handle == "bank" 
            ? Bloodbank.findOne({
                phone: phone
            }) : User.findOne({
                phone: phone,
            })
        )

        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"Wrong username or password",
            });
        }

        const correctPassword = await bcrypt.compare(
            password,
            existingUser.password
        )

        if(!correctPassword){
            return res.status(401).json({
                success: false,
                message: 'Wrong password'
            });
        };

        //sign token
        const token = jwt.sign(
            {
                user: existingUser._id,
                type:handle
            },
            process.env.JWT_SECRET
        );

        res.cookie("token",token, {
            httpOnly:true,
            secure:true,
            sameSite:"none",
        })
        .send();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to login user",
        });
    };
};

exports.logout = async(req,res) => {
    try {
        res.cookie("token","",{
            httpOnly:true,
            secure:true,
            sameSite:"none",
        })
        .send();
        console.log("logged out");
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error, Logout unsuccessful",
        });
    };
};

exports.loggedIn = async(req,res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                auth:false,
            });
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        const user = await (verified.type == "bank" ? Bloodbank : User).findOne({
            _id:verified._user,
        },{ password: 0, donations: 0, requests: 0, stock: 0, __v: 0});
        console.log("Logged In");
        res.send({
            auth:true,
            user:user
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            auth:false,
        })
    }
}