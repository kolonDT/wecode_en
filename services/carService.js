const carDao = require("../models/carDao");

// 차량 번호로 기본 정보 가져오기
const getInfoByCarNumber = async (carNumber) => {
  const checkCarNumber = await carDao.getInfoByCarNumber(carNumber);

  // 입력한 차량 번호와 일치하는 차량이 없을 시 에러
  if (checkCarNumber.length === 0) {
    const error = new Error("INVALID_CAR_NUMBER");
    error.statusCode = 406;
    throw error;
  }

  return await carDao.getInfoByCarNumber(carNumber);
};

// 차량 판매 등록 시간 및 알림 업데이트
const registerProgress = async () => {
  return await carDao.registerProgress();
};

// 차량 판매 등록
const registerCar = async (
  carNumber,
  additionalInfo,
  distance,
  contact,
  image,
  address,
  lat,
  lon
) => {
  // 등록할 차량의 정보를 가져오기 위한 변수 지정
  const carId = await carDao.getInfoByCarNumber(carNumber);
  // 등록할 차량의 등록 절차 및 과정 정보를 가져오기 위한 변수 지정
  const progressId = await carDao.getLatestProgress();

  return await carDao.registerCar(
    carId[0].id,
    progressId[0].id,
    additionalInfo,
    distance,
    contact,
    image,
    address,
    lat,
    lon
  );
};

// 판매 등록된 차량 정보 조회
const registeredCarInfo = async (id) => {
  return await carDao.registeredCarInfo(id);
};

module.exports = {
  getInfoByCarNumber,
  registerCar,
  registerProgress,
  registeredCarInfo,
};
