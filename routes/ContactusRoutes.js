const express = require("express");
const {
  ContactUsNotificationController,
} = require("../controllers/ContactUsNotificationController");

const router = express.Router();

router.post("/contact", ContactUsNotificationController);

module.exports = router;
