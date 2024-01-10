const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    hospital:{
        type:String,
        required: true,
    },
    contactPerson:{
        type:String,
    },
    category:{
        type:String,
        required:true,
    },
    website:{
        type: String,
    },
    phone:{
        type:Number,
        unique : true,
        required:true,
    },
    email:{
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
        required:true,
    },
    longitude:{
        type: Number,
        required:true,
    },
    latitude:{
        type: Number,
        required:true,
    },
    requests:[{
        requestId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Requests"
        },
    }],
    donations:[{
        donationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Donations'
        },
    }],
    stock:{
        'A+':{
            type:Number,
        },
        'A-':{
            type:Number,
        },
        'B+':{
            type: Number,
        },
        'B-':{ 
            type: Number,
        },
        'AB+':{ 
            type: Number, 
        },
        'AB-':{ 
            type: Number,
        },
        'O+':{ 
            type: Number,
        },
        'O-':{ 
            type: Number,
        },
    }
});

const Bloodbank = mongoose.model('Bloodbanks',bloodBankSchema);
module.exports= Bloodbank;