const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getInfoByCarNumber = async (carNumber) => {
  return await prisma.$queryRaw`
		SELECT id, model_name, model_year
		FROM   cars
		WHERE  car_number = ${carNumber}
	`;
};

const updateProgress = async () => {
  return await prisma.$queryRaw`
		INSERT INTO progresses
			(quote_requested)
		VALUES
			(now())
	`;
};

const getLatestProgress = async () => {
  return await prisma.$queryRaw`
		SELECT id
		FROM progresses
		ORDER BY created_at DESC
		LIMIT 1
	`;
};

const registerCar = async (
  carId,
  progressId,
  additionalInfo,
  distance,
  contact,
  image,
  address,
  lat,
  lon
) => {
  return await prisma.$queryRaw`
		INSERT INTO registered_cars
			(car_id, progress_id, additional_info, driving_distance, contact, image, address, lat, lon)
		VALUES
			(${carId}, ${progressId}, ${additionalInfo}, ${distance}, ${contact}, ${image}, ${address}, ${lat}, ${lon})
	`;
};

// const requestDetail = async();

module.exports = {
  getInfoByCarNumber,
  updateProgress,
  getLatestProgress,
  registerCar,
};
