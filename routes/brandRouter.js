const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get("/", brandController.getBrands);

brandRouter.get("/:brand", brandController.getBackpackByBrand);

module.exports = brandRouter;
