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

module.exports = brandRouter;
