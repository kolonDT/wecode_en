const historyDao = require("../models/historyDao");

// 요청 내역 업데이트 및 승인 시간 생성
const updateProgress = async (id, progress) => {
  return await historyDao.updateProgress(id, progress);
};

module.exports = {
  updateProgress,
};
