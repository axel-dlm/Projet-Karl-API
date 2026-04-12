const { Router } = require("express");
const StudioController = require("../controllers/studio");

const router = new Router();

router.get("/studios", StudioController.cget);
router.post("/studios", StudioController.post);
router.get("/studios/:id", StudioController.get);
router.put("/studios/:id", StudioController.put);
router.patch("/studios/:id", StudioController.patch);
router.delete("/studios/:id", StudioController.delete);

module.exports = router;
