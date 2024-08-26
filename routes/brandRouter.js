const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get("/", brandController.getBrands);
brandRouter.get("/create", brandController.getCreateBrand);
brandRouter.post(
  "/create",
  brandController.validateBrand(),
  brandController.createBrand
);

brandRouter.get("/:brand", brandController.getBackpackByBrand);
brandRouter.get("/:brand/update", brandController.getUpdateBrand);
brandRouter.post(
  "/:brand/update",
  brandController.validateBrand(),
  brandController.updateBrand
);

brandRouter.get("/:brand/delete", brandController.deleteBrand);

module.exports = brandRouter;
