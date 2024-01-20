const express = require("express");
const router = express.Router();

const {
    banksInfo,getBanks,updateStock,deleteStock,getStock,updateDonations,updateRequests,getDonations,getRequests,updateBloodbankDetail
} = require("../controllers/Bank");

const { auth } = require("../middleware/auth");

router.post("/:handle",auth,banksInfo);

router.get("/allBanks/:state/:district",getBanks);

router.put("/updateStock",auth,updateStock);

router.put("/deleteStock",auth,deleteStock);

router.get("/getStock",auth,getStock);

router.put("/donations",auth,updateDonations);

router.post("/requests",auth,updateRequests);

router.get("/getDonations",auth,getDonations);

router.get("/getRequests",auth,getRequests);

router.put("/",auth,updateBloodbankDetail);

module.exports = router;


