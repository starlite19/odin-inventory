const express = require("express");
const app = express();
const path = require("node:path");

const indexRouter = require("./routes/indexRouter");
const brandRouter = require("./routes/brandRouter");
const typeRouter = require("./routes/typeRouter");
const volumeRouter = require("./routes/volumeRouter");
const backpackRouter = require("./routes/backpackRouter");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/brands", brandRouter);
app.use("/types", typeRouter);
app.use("/volumes", volumeRouter);
app.use("/backpacks", backpackRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backpack inventory - listening on port ${PORT}!`)
);
