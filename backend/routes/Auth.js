const express = require("express");
const router = express.Router();

const {
    registerUser,login,logout,loggedIn
} = require("../controllers/Auth");

router.post("/:handle",registerUser);
router.post("/login/:handle",login);
router.get("/logout",logout);
router.get("/loggedIn",loggedIn);

module.exports = router;

