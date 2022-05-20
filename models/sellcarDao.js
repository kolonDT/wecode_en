const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 차량 번호로 기본 정보 가져오기
const getInfoByCarNumber = async (carNumber) => {
  return await prisma.$queryRaw`
		SELECT id, model_name, model_year
		FROM   cars
		WHERE  car_number = ${carNumber}
	`;
};

// 차량 판매 등록 시간 및 알림 업데이트
const updateProgress = async () => {
  return await prisma.$queryRaw`
		INSERT INTO progresses
			(quote_requested)
		VALUES
			(now())
	`;
};

// 등록할 차량의 등록 절차 및 과정 정보
const getLatestProgress = async () => {
  return await prisma.$queryRaw`
		SELECT id
		FROM progresses
		ORDER BY created_at DESC
		LIMIT 1
	`;
};

// 차량 판매 등록
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

// 판매 등록된 차량 정보 조회
const registeredCarInfo = async (id) => {
  return await prisma.$queryRaw`
		SELECT
			car_id, progress_id, additional_info, driving_distance, contact, image, address, lat, lon
		FROM registered_cars
		WHERE id = ${id}
	`;
};

module.exports = {
  getInfoByCarNumber,
  updateProgress,
  getLatestProgress,
  registerCar,
  registeredCarInfo,
};
