const mongoose = require("mongoose");

const campSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    district:{
        type : String,
        required:true,
    },
    bankId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bloodbanks",
    },
    organizer:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
    donors:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users',
            unique:true,
        },
        units:{
            type: Number,
            required:true,
        },
        status:{
            type:Number,
            enum:[0,1],
        },
    }],
});

const Camps = mongoose.model("Camps",campSchema);
module.exports=Camps;