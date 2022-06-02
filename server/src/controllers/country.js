// import model here
const { countries } = require("../../models");

exports.addCountry = async (req, res) => {
  try {
    await countries.create(req.body);

    res.send({
      status: "success",
      message: "Add Country",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getCountries = async (req, res) => {
  try {
    const data = await countries.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await countries.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;

    await countries.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await countries.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        countries: updatedData,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    await countries.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "delete country successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
