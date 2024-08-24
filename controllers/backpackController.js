const db = require("../db/queries");

async function getBackpacks(req, res) {
  const backpacks = await db.getAllBackpacks();
  res.render("backpackPage", {
    title: "All Backpacks",
    heading: "Backpacks",
    backpacks: backpacks,
    url: "/backpacks",
  });
}

async function getBackpackById(req, res) {
  const backpackId = req.params.backpack;
  const backpack = await db.getBackpackById(backpackId);
  const brand = await db.getBrandById(backpack[0].company_id);
  res.render("item", {
    backpack: backpack[0],
    company: brand[0],
  });
}

module.exports = {
  getBackpacks,
  getBackpackById,
};
