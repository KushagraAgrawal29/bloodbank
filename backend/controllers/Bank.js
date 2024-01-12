
const Bloodbank = require("../models/Bloodbank");
const Donations = require("../models/BloodDonations");
const Requests = require("../models/BloodRequests");

exports.banksInfo = async(req,res) => {
    try {
        const filter = req.params.handle == "bank" ? {} : { password: 0, requests: 0, donations: 0, stock:0, __v: 0};
        const banks = await Bloodbank.find(req.body,filter);
        res.json(banks);
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error fetching information"
        });
    }
};

exports.getBanks = async(req,res) => {
    try{
        const banks = await Bloodbank.find({
            state: req.params.state,
            district: req.params.district,
        } ,{ password: 0, _id: 0, donations: 0, requests: 0, stock: 0 });
        return res.status(200).json({
            success:true,
            message:"Bank state and district information fetched successfully",
            banks
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching bank state and district information",
        });
    }
};

exports.updateStock = async(req,res) => {
    try{
        const prevStock = await Bloodbank.findOne({
            _id: req.user
        }, { stock: 1 });

        const value = await Bloodbank.updateOne(
            { _id: req.user },
            { $set: {[ "stock." + req.body.bloodGroup]: prevStock.stock[req.body.bloodGroup] + req.body.units }}
        )

        console.log(value);

        return res.status(200).json({
            success: true,
            message: 'Your bloodstock has been updated',
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update the stock."
        });
    }
};

exports.deleteStock = async (req,res) => {
    try{
        const prevStock = await Bloodbank.findOne({ id: req.user }, { stock:1 });
        if(prevStock.stock[req.body.bloodGroup] < req.body.units) {
            return res.status(400).json({
                success:false,
                message:"Not enough Blood",
            });
        }
        else{
            const value = await Bloodbank.updateOne(
                { _id:req.user },
                { $set: {[ "stock." + req.body.bloodGroup]: prevStock.stock[req.body.bloodGroup] - req.body.units } }
            )
            return res.status(200).json({
                success :true ,
                message :"Blood Deleted Successfully from Stock!!"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Blood deletion unsuccessfull",
        })
    }
};

exports.getStock = async(req,res) => {
    try{
        const data = await Bloodbank.findOne(
            { _id: req.user },
            { _id: 0,stock: 1 }
        )
        res.status(200).json({
            success : true,
            message:"Stock data fetched successfully",
            data
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error fetching stock data",
        })
    }
}

