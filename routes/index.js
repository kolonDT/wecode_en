const express = require("express");
const router = express.Router();
const app = express();

const carRoute = require("./carRoute");
const historyRoute = require("./historyRoute");
const uploadRoute = require("./uploadRoute");

router.use("/car", carRoute);
router.use("/history", historyRoute);
router.use("/upload", uploadRoute);
app.use(express.static(__dirname + "/databases/uploads"));

module.exports = router;
