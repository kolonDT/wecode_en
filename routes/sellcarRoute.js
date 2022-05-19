const express = require("express");
const router = express.Router();

const sellcarController = require("../controllers/sellcarController");

router.get("", sellcarController.getInfoByCarNumber);
router.post("", sellcarController.registerCar);

module.exports = router;
