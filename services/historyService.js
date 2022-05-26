const historyDao = require("../models/historyDao");

// 요청 내역 업데이트 및 승인 시간 생성
const updateProgress = async (carNumber, progress) => {
  // 등록 차량 id로 요청 절차 id 가져오기
  const progressId = await historyDao.getProgressId(carNumber);

  return await historyDao.updateProgress(progressId, progress);
};

// Push 알림 설정
const setNotification = async (carNumber, notificationStatus) => {
  // 등록 차량 id로 요청 절차 id 가져오기
  const progressId = await historyDao.getProgressId(carNumber);

  return await historyDao.setNotification(progressId, notificationStatus);
};

module.exports = {
  updateProgress,
  setNotification,
};
