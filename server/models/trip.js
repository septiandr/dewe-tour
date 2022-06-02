'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trip.belongsTo(models.countries, {
        as: "countries",
        foreignKey: {
          name: "idCountry",
        },
      });
    }
  };
  trip.init({
    tittle: DataTypes.STRING,
    accomodation: DataTypes.STRING,
    transportation: DataTypes.STRING,
    eat: DataTypes.STRING,
    day: DataTypes.INTEGER,
    night: DataTypes.INTEGER,
    dateTrip: DataTypes.DATE,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    idCountry: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};