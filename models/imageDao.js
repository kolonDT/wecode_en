const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const uploadImages = async (carId, imageArray) => {
  await prisma.$queryRaw`
		UPDATE registered_cars
		SET image = ${imageArray}
		WHERE id = ${carId}
	`;
};

module.exports = { uploadImages };
