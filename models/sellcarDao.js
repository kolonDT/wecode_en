const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getInfoByCarNumber = async (carNumber) => {
  return await prisma.$queryRaw`
		SELECT model_name, model_year
		FROM   cars
		WHERE  car_number = ${carNumber};
	`;
};

module.exports = { getInfoByCarNumber };
