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

// 차량 판매 등록
const registerCar = async (
  carNumber,
  additionalInfo,
  distance,
  optionIdList,
  contact,
  address,
  addressDetail,
  lat,
  lon
) => {
  // 등록할 차량의 정보를 가져오기 위한 변수 지정
  const carId = await carDao.getInfoByCarNumber(carNumber);

  // 등록할 차량의 번호와 일치하는 차량이 없을 시 에러
  if (carId.length === 0) {
    const error = new Error("INVALID_CAR_NUMBER");
    error.statusCode = 406;
    throw error;
  }

  return await carDao.registerCar(
    carId[0].id,
    additionalInfo,
    distance,
    optionIdList,
    contact,
    address,
    addressDetail,
    lat,
    lon
  );
};

// 판매 등록된 차량 정보 조회
const registeredCarInfo = async (carNumber) => {
  return await carDao.registeredCarInfo(carNumber);
};

// 판매 등록된 모든 차량 정보 조회
const myCarsInfo = async () => {
  return await carDao.myCarsInfo();
};

// 주행 거리 별 차량 시세 조회
const priceByDistance = async (carNumber) => {
  const modelInfo = await carDao.getDistAndPrice(carNumber);
  const modelName = await modelInfo[0].model_name;
  const modelYear = await modelInfo[0].model_year;
  return await carDao.priceByDistance(modelName, modelYear);
};

module.exports = {
  getInfoByCarNumber,
  registerCar,
  registeredCarInfo,
  myCarsInfo,
  priceByDistance,
};
