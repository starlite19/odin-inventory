const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  console.log("index router");
});

// indexRouter.post("/new", indexController.createUsernamePost);

module.exports = indexRouter;
