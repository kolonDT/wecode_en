const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadController = require("../controllers/uploadController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "databases/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});

// 파일 업로드
router.post("/:carId", upload.array("image"), uploadController.uploadImages);

module.exports = router;
