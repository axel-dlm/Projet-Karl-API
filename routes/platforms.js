const { Router } = require("express");
const PlatformController = require("../controllers/platform");

const router = new Router();

router.get("/platforms", PlatformController.cget);
router.post("/platforms", PlatformController.post);
router.get("/platforms/:id", PlatformController.get);
router.put("/platforms/:id", PlatformController.put);
router.patch("/platforms/:id", PlatformController.patch);
router.delete("/platforms/:id", PlatformController.delete);

module.exports = router;
