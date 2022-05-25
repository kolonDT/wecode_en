const carService = require("../services/carService");

// 차량 번호로 기본 정보 가져오기
const getInfoByCarNumber = async (req, res) => {
  try {
    const { carNumber } = req.query;
    console.log("carNumber : ", carNumber);

    if (!carNumber) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const infoByCarNumber = await carService.getInfoByCarNumber(carNumber);

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
      optionIdList,
      contact,
      address,
      addressDetail,
      lat,
      lon,
    } = req.body;

    if (!carNumber || !distance || !contact || !address || !addressDetail) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    // 차량 판매 등록 시간 및 알림 업데이트
    await carService.registerProgress();

    // 차량 판매 등록
    await carService.registerCar(
      carNumber,
      additionalInfo,
      distance,
      optionIdList,
      contact,
      address,
      addressDetail,
      lat,
      lon
    );

    res.status(200).json({ message: "REGISTER_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 판매 등록된 차량 정보 조회
const registeredCarInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const registeredCarInfo = await carService.registeredCarInfo(id);

    res.status(200).json({ registeredCarInfo });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 판매 등록된 모든 차량 정보 조회
const myCarsInfo = async (req, res) => {
  try {
    const myCarsInfo = await carService.myCarsInfo();

    res.status(200).json({ myCarsInfo });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 주행 거리 별 차량 시세 조회
const priceByDistance = async (req, res) => {
  try {
    const { carId } = req.params;
    const priceByDistance = await carService.priceByDistance(carId);

    res.status(200).json({ priceByDistance });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getInfoByCarNumber,
  registerCar,
  registeredCarInfo,
  myCarsInfo,
  priceByDistance,
};
