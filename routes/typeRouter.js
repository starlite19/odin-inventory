const { Router } = require("express");
const typeController = require("../controllers/typeController");
const typeRouter = Router();

typeRouter.get("/", typeController.getTypes);

typeRouter.get("/:type", typeController.getBackpackByType);

module.exports = typeRouter;
