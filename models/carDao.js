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
const registerCarInfo = async (
  carId,
  progressId,
  additionalInfo,
  distance,
  contact,
  address,
  addressDetail,
  lat,
  lon
) => {
  return await prisma.$queryRaw`
		INSERT INTO registered_cars
			(car_id, progress_id, additional_info, driving_distance, contact, address, address_detail, lat, lon)
		VALUES
			(${carId}, ${progressId}, ${additionalInfo}, ${distance}, ${contact}, ${address}, ${addressDetail}, ${lat}, ${lon})
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

// ---------------- Dao to Service ----------------
const registerCar = async (
  carId,
  additionalInfo,
  distance,
  optionIdList,
  contact,
  address,
  addressDetail,
  lat,
  lon
) => {
  // 차량 등록 요청 내역 생성
  await registerProgress();

  // 등록할 차량의 요청 내역 정보를 가져오기 위한 변수 지정
  const progressId = await getLatestProgress();

  // 등록할 차량의 정보 입력
  await registerCarInfo(
    carId,
    progressId[0].id,
    additionalInfo,
    distance,
    contact,
    address,
    addressDetail,
    lat,
    lon
  );

  // 차량 옵션 중간 테이블 조작을 위한 최근 등록된 차량의 id 가져오기
  const registeredCarId = await getLatestRegisteredId();

  // 차량 옵션 중간 테이블 데이터 삽입
  await registerOption(registeredCarId[0].id, optionIdList);
};
// ---------------- Dao to Service End ----------------

// 판매 등록된 차량 정보 조회
const registeredCarInfo = async (carNumber) => {
  return await prisma.$queryRaw`
		SELECT
			rc.id, rc.car_id, rc.progress_id, c.brand, c.car_number, c.model_name, c.model_year
			, GROUP_CONCAT(o.option_name) AS options
			, rc.additional_info, rc.driving_distance, rc.image, rc.contact, rc.address, rc.address_detail, rc.lat, rc.lon
			, p.quote_requested, p.dealer_assigned, p.dealer_consulting, p.selling_requested, p.selling_completed, p.is_new
		FROM registered_cars rc
		LEFT JOIN cars c ON rc.car_id = c.id
		JOIN registered_car_options rco ON rc.id = rco.reg_car_id
		LEFT JOIN options o ON rco.option_id = o.id
		JOIN progresses p ON rc.progress_id = p.id
		WHERE c.car_number = ${carNumber}
		GROUP BY rc.id
	`;
};

// 판매 등록된 모든 차량 정보 조회
const myCarsInfo = async () => {
  return await prisma.$queryRaw`
		SELECT rc.id, rc.car_id, c.car_number
			, p.quote_requested, p.dealer_assigned, p.dealer_consulting, p.selling_requested, p.selling_completed
		FROM registered_cars rc
		JOIN cars c ON rc.car_id = c.id
		JOIN progresses p ON rc.progress_id = p.id
	`;
};

// 해당 차량의 모델명, 주행거리, 가격 정보 조회
const getDistAndPrice = async (carNumber) => {
  return await prisma.$queryRaw`
		SELECT c.model_name, c.model_year, c.driving_distance, c.price_used
		FROM registered_cars rc
		JOIN cars c ON c.id = rc.car_id
		WHERE c.car_number = ${carNumber}
	`;
};

// 주행 거리 별 차량 시세 조회
const priceByDistance = async (modelName, modelYear) => {
  return await prisma.$queryRaw`
		SELECT driving_distance, price_used
		FROM cars
		WHERE model_name = ${modelName}
		AND model_year = ${modelYear}
	`;
};

module.exports = {
  getInfoByCarNumber,
  registerCar,
  registeredCarInfo,
  myCarsInfo,
  getDistAndPrice,
  priceByDistance,
};
