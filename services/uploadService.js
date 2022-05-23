const uploadDao = require("../models/uploadDao");

// 이미지 업로드
const uploadImages = async (carId, imageArray) => {
  return await uploadDao.uploadImages(carId, imageArray.toString());
};

module.exports = { uploadImages };
