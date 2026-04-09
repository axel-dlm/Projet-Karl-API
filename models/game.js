const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");

class Game extends Model {}

Game.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize: connection,
    modelName: "Game",
    tableName: "games",
  }
);

module.exports = Game;
