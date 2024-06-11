const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/Auth");
const { verifyUser } = require("../middlewares/verifyuser");

// ! *************** Router *************************
router.post("/signup", signup);
router.post("/login", login);
// router.post("/reset-password", verifyUser, changepassword);

module.exports = router;
