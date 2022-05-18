const sellcarDao = require("../models/sellcarDao");

const getInfoByCarNumber = async (carNumber) => {
  return await sellcarDao.getInfoByCarNumber(carNumber);
};

module.exports = { getInfoByCarNumber };
