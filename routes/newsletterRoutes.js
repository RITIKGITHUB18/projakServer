const express = require("express");
const { subscribeUser } = require("../controllers/newsletterController");
const { validateSubscription } = require("../middlewares/validation");

const router = express.Router();

router.post("/subscribe", validateSubscription, subscribeUser);

module.exports = router;
