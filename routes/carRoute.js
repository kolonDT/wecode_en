const express = require("express");
const router = express.Router();

const carController = require("../controllers/carController");

// 차량 번호판 정보 입력 시 차량 기본 정보
router.get("", carController.getInfoByCarNumber);
// 차량 판매 등록
router.post("", carController.registerCar);
// 판매 등록된 모든 차량 정보 조회
router.get("/myCars", carController.myCarsInfo);
// 판매 등록된 차량 정보 조회
router.get("/myCar", carController.registeredCarInfo);
// 판매 등록된 차량 정보 조회
router.get("/priceByDistance", carController.priceByDistance);

module.exports = router;
