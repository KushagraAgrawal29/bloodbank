
const Camp = require("../models/Camps");

exports.createCamp = async (req,res) => {
    try{
        req.body.bankId = req.user;
        req.body.donars = [];

        const newCamp = new Camp(req.body);
        const campData = await newCamp.save();
        console.log(campData);

        return res.status(200).json({
            success: true,
            message:"Camp is created successfully"
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            status: 'false',
            message: "Error creating new camp",
        });
    }
};

exports.getCampDetails = async(req,res) => {
    try{
        let query = {};
        if(req.params.state){
            query.state = req.params.state;
            query.district = req.params.district;
        }
        else{
            query.bankId = req.user
        }

        const campRelatedData = await Camp.find(query).populate('bankId', '-_id -__v -password -requests -donations -stock').populate({
            path: "donors._id",
            select: '-__v -password'
        })

        console.log(campRelatedData);
        return res.status(200).json({
            success:true,
            message:"Camp details fetched successfully",
            campRelatedData
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            status: 'false',
            message: "Error getting camp details",
        });
    }
};

exports.getAllCamps = async (req,res) => {
    try{
        if(req.params.date){
            const data = await Camp.find({
                state: req.params.state,
                district: req.params.district,
                date: new Date(req.params.date)
            },{
                donors:0,
                _id:0
            }).populate("bankId","-_id -password -donations -requests -stock +name");

            console.log(data);

            return res.status(200).json({
                success:true,
                message:"All Camps information fetched successfully",
                data
            })
        }
        else{
            return res.status(400).json({
                status:'fail',
                message:"Please provide a valid date",
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            status: 'false',
            message: "Error getting all camps",
        });
    }
};

exports.updateCampDetails = async (req,res) => {
    try{
        if(req.params.id){
            // Find the camp and update it with the received data
            const updatedData = await Camp.update(
                {
                    _id: req.params.id,
                    donors:{
                        $eleMatch: {
                            _id: req.params.userId,
                            status: 0,
                        }
                    }
                },
                {
                    $set: {
                        "donors.$.units": req.body.units, "donors.$.status": 1 
                    }
                }
            )
            console.log(updatedData);
        }
        else{
            // If no user is found in the donors array of the camp document then add
            if(await Camp.find({
                _id:req.params.id,
                donors: {
                    $eleMatch: {
                        _id: req.user
                    }
                }
            }) != []){
                await Camp.updateOne(
                    {
                        _id : req.user,

                    },
                    {
                        $push: {
                            donors: {
                                _id: req.user,
                            }
                        }
                    }
                )
            }
        }
        return res.status(200).json({
            success: true,
            message:"Donation Successful! and data updated successfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            status: 'false',
            message: "Error updating Camp information",
        });
    }
}