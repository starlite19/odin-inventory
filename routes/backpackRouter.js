const { Router } = require("express");
const backpackController = require("../controllers/backpackController");
const backpackRouter = Router();

backpackRouter.get("/", backpackController.getBackpacks);

backpackRouter.get("/:backpack", backpackController.getBackpackById);

module.exports = backpackRouter;
