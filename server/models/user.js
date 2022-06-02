'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      user.belongsTo(models.transactions, {
        as: "transactions",
        foreignKey: {
          name: "idTransaction",
        },
      });
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    status: DataTypes.STRING,
    photo: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    idTransaction: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};