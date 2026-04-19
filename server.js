const express = require("express");

require("./models/associations");

const formatMiddleware = require("./middlewares/format");
const i18nMiddleware = require("./middlewares/i18n");

const app = express();

app.use(express.json());
app.use(i18nMiddleware);
app.use(formatMiddleware);

app.use(require("./routes/games"));
app.use(require("./routes/studios"));
app.use(require("./routes/platforms"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
