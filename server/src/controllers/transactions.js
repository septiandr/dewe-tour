// import model here
const { transactions } = require("../../models");
const { trip } = require("../../models");
const { countries } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const{...data}= req.body
    console.log()
    const newTransaction = await transactions.create({
     ...data,
   })

    res.send({
      newTransaction,
      status: "success",
      message: "Add transaction finished",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getTransactions = async (req, res) => {
  try {
    const data = await transactions.findAll({
      include: [
        {
          model: trip,
          as: "trip",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        },
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

exports.getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await transactions.findOne({
      where: {
        id,
      },
      include: [
        {
            model: trip,
            as :'trip',
            include: [
                {
                    model: countries,
                    as:'countries',
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        },

    ]
})
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
exports.updateTransaction = async (req, res) => {
  try {
    console.log('t')
    const{...data}=req.body
    const image = req.file.filename
    
    const update ={
      ...data,attachment:image
    }
    const { id } = req.params;
    await transactions.update(update, {
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
       updatedData,
    
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateTransactionn = async (req, res) => {
  try {
 
    const{...data}=req.body
    const dataa=JSON.stringify(data)

    console.log(dataa)
    console.log(data)
    const update ={
      ...data,
    }
    const { id } = req.params;
    await transactions.update(update, {
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
       updatedData,
    
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  console.log("t")
  try {
    await transactions.destroy({
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
