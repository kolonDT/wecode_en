const express = require("express");
const router = express.Router();

const carRoute = require("./carRoute");
const historyRoute = require("./historyRoute");

router.use("/car", carRoute);
router.use("/history", historyRoute);

module.exports = router;
