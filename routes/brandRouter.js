const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get("/", (req, res) => {
  console.log("brand router");
});

module.exports = brandRouter;
