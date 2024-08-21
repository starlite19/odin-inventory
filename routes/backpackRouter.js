const { Router } = require("express");
const backpackController = require("../controllers/backpackController");
const backpackRouter = Router();

backpackRouter.get("/", (req, res) => {
  console.log("backpack router");
});

module.exports = backpackRouter;
