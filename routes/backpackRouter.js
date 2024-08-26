const { Router } = require("express");
const backpackController = require("../controllers/backpackController");
const backpackRouter = Router();

backpackRouter.get("/", backpackController.getBackpacks);
backpackRouter.get("/create", backpackController.getCreateBackpack);
backpackRouter.post(
  "/create",
  backpackController.validateBackpack(),
  backpackController.createBackpack
);

backpackRouter.get("/:backpack", backpackController.getBackpackById);

module.exports = backpackRouter;
