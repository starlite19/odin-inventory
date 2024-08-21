const { Router } = require("express");
const volumeController = require("../controllers/volumeController");
const volumeRouter = Router();

volumeRouter.get("/", (req, res) => {
  console.log("volume router");
});

module.exports = volumeRouter;
