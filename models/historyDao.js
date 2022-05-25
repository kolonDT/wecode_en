const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 등록 차량 id로 해당하는 progress_id 가져오기
const getProgressId = async (carId) => {
  const progressId = await prisma.$queryRaw`
    SELECT progress_id
    FROM registered_cars
    WHERE id = ${carId};
	`;

  return progressId[0].progress_id;
};

// 해당하는 progress_id 에 요청값으로 절차명을 받아 업데이트 된 시간을 저장
const updateProgress = async (progressId, progress) => {
  return await prisma.$queryRaw`
		UPDATE progresses
    SET ${Prisma.raw(progress)} = now()
    WHERE id = ${progressId}
	`;
};

// Push 알림 설정
const setNotification = async (progressId, notificationStatus) => {
  return await prisma.$queryRaw`
    UPDATE progresses
    SET is_new = ${notificationStatus}
    WHERE id = ${progressId}
  `;
};

module.exports = { getProgressId, updateProgress, setNotification };
