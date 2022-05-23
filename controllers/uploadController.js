const uploadService = require("../services/uploadService");

// 이미지 업로드
const uploadImages = async (req, res) => {
  try {
    const { carId } = req.params;

    const imageArray = [];
    for (i = 0; i < req.files.length; i++) {
      imageArray.push(req.files[i].originalname);
    }

    await uploadService.uploadImages(carId, imageArray);

    res.status(200).json({ message: "UPLOAD_IMAGES_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { uploadImages };
