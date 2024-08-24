const { Router } = require("express");
const volumeController = require("../controllers/volumeController");
const volumeRouter = Router();

volumeRouter.get("/", volumeController.getVolumes);

volumeRouter.get("/:vol", volumeController.getBackpackByVolume);

module.exports = volumeRouter;
