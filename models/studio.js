const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");

class Studio extends Model {}

Studio.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foundedYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connection,
    modelName: "Studio",
    tableName: "studios",
  }
);

module.exports = Studio;
