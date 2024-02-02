const mongoose = require('mongoose');

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required: true,
    },
    gender:{
        type: String,  // male or female
        requried:true,
    },
    bloodGroup:{
        type:String,   // A+ , B- etc..
        enum:bloodGroups,
        required:true,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    address:{
        type:String,
    },
});

const User = mongoose.model('User',userSchema);
module.exports = User;