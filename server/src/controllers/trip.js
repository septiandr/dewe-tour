// import model here
const { trip } = require("../../models");
const { countries } = require("../../models");

exports.addTrip = async (req, res) => {
  try {
    const{...data}= req.body

    console.log(req.files)
    const image = JSON.stringify(req.files)
    console.log(image)

    const newtrip = await trip.create({
      ...data,
      image:image
    })

    console.log(newtrip)
    res.send({
      newtrip,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getTrips = async (req, res) => {
  try {
    const data = await trip.findAll({
      include: [
        {
          model: countries,
          as: "countries",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        }
      ],
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

exports.getTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await trip.findOne({
      where: {
        id,
      },
      include: [
        {
          model: countries,
          as: "countries",
          attributes: {
            exclude: ["createdAt", "updatedAt","id"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
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
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
    const image = req.files.image[0].filename
    const update ={
      ...data,image
    }
    await trip.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await trip.findOne({
      where:{
        id,
      }

    });
    res.send({
      status: "success",
      data: {
        trip: updatedData,
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
exports.deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    await trip.destroy({
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
