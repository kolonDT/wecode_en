const express = require("express");
const router = express.Router();
const multer = require("multer");

const imageController = require("../controllers/imageController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "databases/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  allowedMimeTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb({ message: `INVALID_FILENAME_EXTENSION` }, false);
};

console.log("storage end");

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});

// 파일 업로드
router.post("/:carId", upload.array("image"), imageController.uploadImages);
// 파일명으로 이미지 파일 가져오기
router.get("/:fileName", imageController.getImages);

module.exports = router;
