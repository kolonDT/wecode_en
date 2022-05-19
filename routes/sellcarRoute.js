const express = require("express");
const router = express.Router();

const sellcarController = require("../controllers/sellcarController");

// 차량 번호판 정보 입력 시 차량 기본 정보
router.get("", sellcarController.getInfoByCarNumber);
// 차량 판매 등록
router.post("", sellcarController.registerCar);

module.exports = router;
