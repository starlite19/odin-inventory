const { Router } = require("express");
const typeController = require("../controllers/typeController");
const typeRouter = Router();

typeRouter.get("/", typeController.getTypes);
typeRouter.get("/create", typeController.getCreateType);
typeRouter.post(
  "/create",
  typeController.validateType(),
  typeController.createType
);

typeRouter.get("/:type", typeController.getBackpackByType);
typeRouter.get("/:type/update", typeController.getUpdateType);
typeRouter.post(
  "/:type/update",
  typeController.validateType(),
  typeController.updateType
);

module.exports = typeRouter;
