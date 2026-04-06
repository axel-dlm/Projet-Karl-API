const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API jeux video");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
