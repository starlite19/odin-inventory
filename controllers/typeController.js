const db = require("../db/queries");

async function getTypes(req, res) {
  const types = await db.getAllTypes();
  res.render("categoryPage", {
    title: "Types",
    heading: "Types",
    categories: types,
    url: "/types",
  });
}

async function getBackpackByType(req, res) {
  const typeId = req.params.type;
  const type = await db.getTypeById(typeId);
  const backpacks = await db.getBackpackByType(type[0].name);
  res.render("backpackPage", {
    title: type[0].name,
    heading: type[0].name + " Backpacks",
    backpacks: backpacks,
    url: "/backpacks",
  });
}

module.exports = {
  getTypes,
  getBackpackByType,
};
