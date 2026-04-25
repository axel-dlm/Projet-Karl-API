const { Router } = require("express");
const GameController = require("../controllers/game");

const router = new Router();

router.get("/games", (req, res, next) => {
  const version = req.headers["x-api-version"] || "2";
  if (version === "1") {
    return GameController.cgetV1(req, res, next);
  }
  return GameController.cgetV2(req, res, next);
});

router.post("/games", GameController.post);
router.get("/games/:id", GameController.get);
router.put("/games/:id", GameController.put);
router.patch("/games/:id", GameController.patch);
router.delete("/games/:id", GameController.delete);

module.exports = router;
