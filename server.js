const express = require("express");

require("./models/associations");

const app = express();

app.use(express.json());

app.use(require("./routes/games"));
app.use(require("./routes/studios"));
app.use(require("./routes/platforms"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
