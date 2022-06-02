// import model here
const { user } = require("../../models");
const {transactions} = require("../../models")
const {trip} = require("../../models")
const {countries}= require("../../models")
exports.addUser = async (req, res) => {
  try {
    await user.create(req.body);

    res.send({
      status: "success",
      message: "Add user finished",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const data = await user.findAll({
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

exports.getUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const data = await user.findOne({
     
      where: {
        id,
      },  include: [
        {
            model: transactions,
            as :'transactions',
            include: [
                {
                    model: trip,
                    as:'trip',
                    include: [
                      {
                          model: countries,
                          as:'countries',
                          attributes: {
                              exclude: ["createdAt", "updatedAt"]
                          }
                      }
                  ],
                }
            ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }
    ]
    });
    const newdata = data.transactions
    res.send({
      status: "success",
      data,
      newdata,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await user.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        user: updatedData,
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
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "delete user successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
