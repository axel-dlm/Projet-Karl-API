const connection = require("./models/connection");
const { Game, Studio, Platform } = require("./models/associations");

async function seed() {
  await connection.sync({ force: true });

  const nintendo = await Studio.create({ name: "Nintendo", country: "Japan", foundedYear: 1889 });
  const fromSoftware = await Studio.create({ name: "FromSoftware", country: "Japan", foundedYear: 1986 });
  const cdProjekt = await Studio.create({ name: "CD Projekt Red", country: "Poland", foundedYear: 2002 });

  const switchPlatform = await Platform.create({ name: "Nintendo Switch", manufacturer: "Nintendo" });
  const ps5 = await Platform.create({ name: "PlayStation 5", manufacturer: "Sony" });
  const pc = await Platform.create({ name: "PC", manufacturer: "Various" });

  const zelda = await Game.create({
    title: "The Legend of Zelda: Breath of the Wild",
    releaseYear: 2017,
    genre: "adventure",
    rating: 9.7,
    studioId: nintendo.id,
  });
  await zelda.setPlatforms([switchPlatform]);

  const eldenRing = await Game.create({
    title: "Elden Ring",
    releaseYear: 2022,
    genre: "rpg",
    rating: 9.5,
    studioId: fromSoftware.id,
  });
  await eldenRing.setPlatforms([ps5, pc]);

  const witcher = await Game.create({
    title: "The Witcher 3: Wild Hunt",
    releaseYear: 2015,
    genre: "rpg",
    rating: 9.3,
    studioId: cdProjekt.id,
  });
  await witcher.setPlatforms([ps5, pc, switchPlatform]);

  console.log("Seed done");
  await connection.close();
}

seed();
