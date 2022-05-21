const express = require("express");
const router = express.Router();

const sellcarRoute = require("./sellcarRoute");
const historyRoute = require("./historyRoute");

router.use("/sellcar", sellcarRoute);
router.use("/history", historyRoute);

module.exports = router;
