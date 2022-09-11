"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(models.User, { foreignKey: "userId" });
      Trip.hasMany(models.Cost, { foreignKey: "tripId" });
    }
  }
  Trip.init(
    {
      tripName: DataTypes.STRING,
      startPlace: DataTypes.STRING,
      startDate: DataTypes.STRING,
      destination: DataTypes.STRING,
      duration: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
