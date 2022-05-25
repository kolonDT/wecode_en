const imageDao = require("../models/imageDao");

// 이미지 업로드
const uploadImages = async (carId, imageArray) => {
  return await imageDao.uploadImages(carId, imageArray.toString());
};

module.exports = { uploadImages };
