const express = require("express");
const router = express.Router();
const app = express();

const carRoute = require("./carRoute");
const historyRoute = require("./historyRoute");
const imageRoute = require("./imageRoute");

router.use("/car", carRoute);
router.use("/history", historyRoute);
router.use("/image", imageRoute);

module.exports = router;
