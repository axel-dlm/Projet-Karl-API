const connection = require("./models/connection");
require("./models/associations");

connection
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    return connection.close();
  });
