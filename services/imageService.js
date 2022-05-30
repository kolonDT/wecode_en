const imageDao = require("../models/imageDao");

// 이미지 업로드
const uploadImages = async (carNumber, imageArray) => {
  return await imageDao.uploadImages(carNumber, imageArray.toString());
};

module.exports = { uploadImages };
