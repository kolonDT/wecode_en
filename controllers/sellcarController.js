const sellcarService = require("../services/sellcarService");

// 차량 번호로 기본 정보 가져오기
const getInfoByCarNumber = async (req, res) => {
  try {
    const { carNumber } = req.body;

    if (!carNumber) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const infoByCarNumber = await sellcarService.getInfoByCarNumber(carNumber);

    res.status(200).json({ infoByCarNumber });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 차량 판매 등록하기
const registerCar = async (req, res) => {
  try {
    const {
      carNumber,
      additionalInfo,
      distance,
      contact,
      image,
      address,
      lat,
      lon,
    } = req.body;

    if (!carNumber || !distance || !contact || !address) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    // 차량 판매 등록 시간 및 알림 업데이트
    await sellcarService.updateProgress();

    // 차량 판매 등록
    await sellcarService.registerCar(
      carNumber,
      additionalInfo,
      distance,
      contact,
      image,
      address,
      lat,
      lon
    );

    res.status(200).json({ message: "REGISTER_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getInfoByCarNumber, registerCar };
