const Game = require("./game");
const Studio = require("./studio");
const Platform = require("./platform");

Studio.hasMany(Game, { foreignKey: "studioId", as: "games" });
Game.belongsTo(Studio, { foreignKey: "studioId", as: "studio" });

Game.belongsToMany(Platform, { through: "GamePlatforms", as: "platforms" });
Platform.belongsToMany(Game, { through: "GamePlatforms", as: "games" });

module.exports = { Game, Studio, Platform };
