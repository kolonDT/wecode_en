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
  const { model_name, model_year, ...rest } = await carDao.getDistAndPrice(
    carNumber
  );
  const otherCarsInfo = await carDao.priceByDistance(
    carNumber,
    model_name,
    model_year
  );
  otherCarsInfo.unshift(rest);
  return otherCarsInfo;
};

const deleteRegisteredCar = async (carNumber) => {
  // 판매 등록 된 차량 여부 확인을 위한 변수 지정
  const registeredCarInfoByCarNumber =
    await carDao.registeredCarInfoByCarNumber(carNumber);

  // 판매 등록 된 차량의 번호와 일치하는 차량이 없을 시 에러
  console.log(registeredCarInfoByCarNumber);
  if (registeredCarInfoByCarNumber.length === 0) {
    const error = new Error("INVALID_CAR_NUMBER");
    error.statusCode = 406;
    throw error;
  }

  await carDao.deleteRegisteredCar(carNumber);
};

module.exports = {
  getInfoByCarNumber,
  registerCar,
  registeredCarInfo,
  myCarsInfo,
  priceByDistance,
  deleteRegisteredCar,
};
