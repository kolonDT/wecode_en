const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 이미지 업로드
const uploadImages = async (carNumber, imageArray) => {
  await prisma.$queryRaw`
		UPDATE registered_cars rc
		JOIN cars c ON rc.car_id = c.id
		SET rc.image = ${imageArray}
		WHERE c.car_number = ${carNumber}
	`;
};

module.exports = { uploadImages };
