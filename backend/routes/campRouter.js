const express = require("express");
const router = express.Router();

const { createCamp,getCampDetails,getAllCamps,updateCampDetails } = require("../controllers/Camp");

const { auth } = require("../middleware/auth");

router.post("/",auth,createCamp);

router.get("/:state?/:district?",auth,getCampDetails);

router.get("/allCamps/:state/:district/:date",getAllCamps);

router.put("/:id/:userId?",auth,updateCampDetails);

module.exports = router;
