'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.trip, {
        as: "trip",
        foreignKey: {
          name: "idTrip",
        },
      });
    }
    
  };
  transactions.init({
    counterQty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING,
    idTrip: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};