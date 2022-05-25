const imageService = require("../services/imageService");
const fs = require("fs");

// 이미지 업로드
const uploadImages = async (req, res) => {
  try {
    const { carNumber } = req.query;

    const imageArray = [];
    for (i = 0; i < req.files.length; i++) {
      imageArray.push(req.files[i].originalname);
    }

    await imageService.uploadImages(carNumber, imageArray);

    res.status(200).json({ message: "UPLOAD_IMAGES_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 파일명으로 이미지 파일 가져오기
const getImages = async (req, res) => {
  const filename = req.params.fileName;
  fs.exists(__dirname + "/../databases/uploads/" + filename, (exists) => {
    exists
      ? fs.readFile(
          __dirname + "/../databases/uploads/" + filename,
          (err, data) => {
            res.end(data);
          }
        )
      : res.json("NO_FILE_EXISTS");
  });
};

module.exports = { uploadImages, getImages };
