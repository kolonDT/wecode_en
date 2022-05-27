const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 차량 번호로 등록 차량 id 가져오기
const getCarIdByCarNumber = async (carNumber) => {
  const registeredCarId = await prisma.$queryRaw`
		SELECT rc.id
		FROM registered_cars rc
		JOIN cars c ON rc.car_id = c.id
		WHERE c.car_number = ${carNumber}
	`;
  return registeredCarId[0].id;
};

// 이미지 업로드
const uploadImages = async (registeredCarId, imageArray) => {
  await prisma.$queryRaw`
		UPDATE registered_cars
		SET image = ${imageArray}
		WHERE id = ${registeredCarId}
	`;
};

module.exports = { uploadImages, getCarIdByCarNumber };
