const mongoose = require("mongoose");

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const bloodRequestsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    bankId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Bloodbanks",
    },
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    bloodGroup:{
        type:String,
        enum:bloodGroups,
        required: true,
    },
    uints:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
    },
    status:{
        type:String,
        enum: ['Pending', 'Approved', 'Denied', 'Completed'], 
    },
});

const BloodRequests = mongoose.model('Requests',bloodRequestsSchema);
module.exports = BloodRequests;