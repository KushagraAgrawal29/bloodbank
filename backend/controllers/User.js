const User = require("../models/User");
const Bloodbank = require("../models/Bloodbank");
const Donations = require("../models/BloodDonations");
const Requests = require("../models/BloodRequests");

exports.getUser = async(req, res) => {
  try {
    const user = await User.find({
      _id: req.user,
    });

    console.log(user);
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user,
    });
  } 
  catch (error) {
    console.log("Error in getting user details : ", error);
    return res.status(500).json({
      success: false,
      message: "Error getting User Details",
    });
  }
};

exports.createDonation = async (req, res) => {
  try {
    req.body.userId = req.user;

    const date = new Date();
    req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString();

    const newDonation = new Donations(req.body);
    const saved = await newDonation.save();

    console.log(newDonation);
    console.log(saved);

    const updatedData = await Bloodbank.update(
      {
        _id: req.body.bankId,
      },
      {
        $push: {
          donations: {
            _id: saved._id,
          },
        },
      }
    );

    console.log(updatedData);

    return res.status(200).json({
      success: true,
      message: "Donation created and updated in bank database",
      saved,
    });
  } catch (error) {
    console.log("Error in getting user details : ", error);
    return res.status(500).json({
      success: false,
      message: "Error creating donation in database",
    });
  }
};

exports.createRequest = async (req, res) => {
  try {
    //taking userId from req.user and puttting it into request body
    req.body.userId = req.user;

    const date = new Date();
    req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString();

    const newRequest = new Request(req.body);
    const saved = await newRequest.save();

    const newDataValue = await Bloodbank.update(
      {
        _id: req.body.bankId,
      },
      {
        $push: {
          requests: {
            _id: saved._id,
          },
        },
      }
    );

    console.log(newDataValue);

    return res.status(200).json({
      success: true,
      message: "Request Created and updated in bank database",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error creating request in database",
    });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const data = await Donations.find({
      bankId: req.user,
    }).populate("userId", "-__v -password -requests -donations -stock");

    return res.status(200).json({
      success: true,
      message: "Successfully fetched donations",
    });
  } catch (error) {
    console.log("ERROR IN GETTING DONATIONS : ", error);
    return res.status(500).json({
      success: false,
      message: "Error getting donations information",
    });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const data = await Requests.find({
      bankId: req.id,
    }).populate("userId", "-__v -password -requests -donations -stock");

    return res.status(200).json({
      success: true,
      message: "Successfully fetched requests information",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error getting requests information",
    });
  }
};

exports.updateUser = async (req,res) => {
    try{
        console.log(req.user);
        User.updateOne({
            _id: req.user
        }, req.body, (error,user) => {
            if(error){
                return res.status(401).json({
                    succes:false,
                    message:"Failed to update user"
                })
            }
            else{
                return res.status(200).json({
                    succes:true,
                    message:"User updated successfully!"
                })
            }
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update user information"
        })
    }
}
 