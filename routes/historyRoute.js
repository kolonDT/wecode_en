const express = require("express");
const router = express.Router();

const historyController = require("../controllers/historyController");

// 요청 내역 업데이트 및 승인 시간 생성
router.patch("/:id", historyController.updateProgress);

// Push 알림 설정
router.patch("/notification/:id", historyController.setNotification);

module.exports = router;
