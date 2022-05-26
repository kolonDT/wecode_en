const imageDao = require("../models/imageDao");

// 이미지 업로드
const uploadImages = async (carNumber, imageArray) => {
  const registeredCarId = await imageDao.getCarIdByCarNumber(carNumber);

  return await imageDao.uploadImages(registeredCarId, imageArray.toString());
};

module.exports = { uploadImages };
