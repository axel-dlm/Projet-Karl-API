const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");

class Platform extends Model {}

Platform.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Platform",
    tableName: "platforms",
  }
);

module.exports = Platform;
