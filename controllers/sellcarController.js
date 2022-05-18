const sellcarService = require("../services/sellcarService");

const getInfoByCarNumber = async (req, res) => {
  try {
    const { carNumber } = req.body;
    const infoByCarNumber = await sellcarService.getInfoByCarNumber(carNumber);

    res.status(200).json({ infoByCarNumber });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getInfoByCarNumber };
