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
const registerProgress = async () => {
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

// 최근 등록한 차량의 id
const getLatestRegisteredId = async () => {
  return await prisma.$queryRaw`
		SELECT id
		FROM registered_cars
		ORDER BY created_at DESC
		LIMIT 1
	`;
};

// 차량 옵션 중간 테이블 입력
const registerOption = async (regCarId, optionIdList) => {
  for (i = 0; i < optionIdList.length; i++) {
    await prisma.$queryRaw`
			INSERT INTO registered_car_options (reg_car_id, option_id)
			VALUES (${regCarId}, ${optionIdList[i]});
		`;
  }

  return;
};

// 판매 등록된 차량 정보 조회
const registeredCarInfo = async (id) => {
  return await prisma.$queryRaw`
		SELECT
			rc.id, rc.car_id, rc.progress_id, c.brand, c.car_number, c.model_name, c.model_year
			, GROUP_CONCAT(o.option_name) AS options
			, rc.driving_distance, rc.image, rc.contact, rc.address, rc.lat, rc.lon
			, p.quote_requested, p.dealer_assigned, p.dealer_consulting, p.selling_requested, p.selling_completede
		FROM registered_cars rc
		LEFT JOIN cars c ON rc.car_id = c.id
		JOIN registered_car_options rco ON rc.id = rco.reg_car_id
		LEFT JOIN options o ON rco.option_id = o.id
		JOIN progresses p ON rc.progress_id = p.id
		WHERE rc.id = ${id}
	`;
};

module.exports = {
  getInfoByCarNumber,
  registerProgress,
  getLatestProgress,
  registerCar,
  getLatestRegisteredId,
  registerOption,
  registeredCarInfo,
};
