const { Router } = require("express");
const GameController = require("../controllers/game");

const router = new Router();

router.get("/games", GameController.cget);
router.post("/games", GameController.post);
router.get("/games/:id", GameController.get);
router.put("/games/:id", GameController.put);
router.patch("/games/:id", GameController.patch);
router.delete("/games/:id", GameController.delete);

module.exports = router;
