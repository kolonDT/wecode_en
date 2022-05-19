const sellcarDao = require("../models/sellcarDao");

const getInfoByCarNumber = async (carNumber) => {
  const checkCarNumber = await sellcarDao.getInfoByCarNumber(carNumber);

  if (checkCarNumber.length === 0) {
    const error = new Error("INVALID_CAR_NUMBER");
    error.statusCode = 406;
    throw error;
  }

  return await sellcarDao.getInfoByCarNumber(carNumber);
};

const updateProgress = async () => {
  return await sellcarDao.updateProgress();
};

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
  const carId = await sellcarDao.getInfoByCarNumber(carNumber);
  const progressId = await sellcarDao.getLatestProgress();

  return await sellcarDao.registerCar(
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

module.exports = { getInfoByCarNumber, registerCar, updateProgress };
