const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 해당하는 progress_id 에 요청값으로 절차명을 받아 업데이트 된 시간을 저장
const updateProgress = async (id, progress) => {
  return await prisma.$queryRaw`
		UPDATE progresses
    SET ${Prisma.raw(progress)} = now()
    WHERE id = ${id}
	`;
};

module.exports = { updateProgress };
