const historyService = require("../services/historyService");

// 요청 내역 업데이트 및 승인 시간 생성
const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    await historyService.updateProgress(id, progress);

    res.status(200).json({ message: "UPDATE_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { updateProgress };
