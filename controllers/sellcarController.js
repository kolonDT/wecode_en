const sellcarService = require("../services/sellcarService");

const getInfoByCarNumber = async (req, res) => {
  try {
    const { carNumber } = req.body;

    if (!carNumber) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const infoByCarNumber = await sellcarService.getInfoByCarNumber(carNumber);

    res.status(200).json({ infoByCarNumber });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const registerCar = async (req, res) => {
  try {
    const {
      carNumber,
      additionalInfo,
      distance,
      contact,
      image,
      address,
      lat,
      lon,
    } = req.body;

    if (!carNumber || !distance || !contact || !address) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    await sellcarService.updateProgress();

    await sellcarService.registerCar(
      carNumber,
      additionalInfo,
      distance,
      contact,
      image,
      address,
      lat,
      lon
    );

    res.status(200).json({ message: "REGISTER_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getInfoByCarNumber, registerCar };
