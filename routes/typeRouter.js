const { Router } = require("express");
const typeController = require("../controllers/typeController");
const typeRouter = Router();

typeRouter.get("/", (req, res) => {
  console.log("type router");
});

module.exports = typeRouter;
