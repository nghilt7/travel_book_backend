"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip_Cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trip_Cost.init(
    {
      tripId: DataTypes.INTEGER,
      costId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Trip_Cost",
    }
  );
  return Trip_Cost;
};
