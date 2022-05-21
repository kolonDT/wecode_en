const historyDao = require("../models/historyDao");

// 요청 내역 업데이트 및 승인 시간 생성
const updateProgress = async (carId, progress) => {
  // 등록 차량 id로 요청 절차 id 가져오기
  const progressId = await historyDao.getProgressId(carId);

  return await historyDao.updateProgress(progressId, progress);
};

module.exports = {
  updateProgress,
};
