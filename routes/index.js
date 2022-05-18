const express = require("express");
const router = express.Router();

const sellcarRoute = require("./sellcarRoute");

router.use("/sellcar", sellcarRoute);

module.exports = router;
