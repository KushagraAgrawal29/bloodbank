const express = require("express");
const router = express.Router();

const { getUser,createDonation,createRequest,getDonations,getRequests,updateUser, getBank} = require("../controllers/User");

const { auth } = require("../middleware/auth");

router.get("/getUser", auth, getUser);

router.get("/getBank", auth, getBank);

router.post("/donate", auth , createDonation);

router.post("/request",auth,createRequest);

router.get("/donations",auth,getDonations);

router.get("/requests",auth,getRequests);

router.put("/",auth,updateUser);

module.exports = router;
