const mongoose = require("mongoose");

const bloodDonationsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    bankId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bloodbanks',
        required:true,
    },
    units:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    disease:{
        type:String,
    },
    status:{
        type:String,
        required:true,
        enum:["Pending","Approved","Denied","Donated"],
    },
});

const BloodDonations = mongoose.model('Donations',bloodDonationsSchema);
module.exports=BloodDonations;