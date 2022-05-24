const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 이미지 업로드
const uploadImages = async (carId, imageArray) => {
  await prisma.$queryRaw`
		UPDATE registered_cars
		SET image = ${imageArray}
		WHERE id = ${carId}
	`;
};

module.exports = { uploadImages };
