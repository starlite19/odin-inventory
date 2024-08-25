const read_db = require("../db/read-queries");
const create_db = require("../db/create-queries");

const { body, validationResult } = require("express-validator");

async function getBackpacks(req, res) {
  const backpacks = await read_db.getAllBackpacks();
  res.render("backpackPage", {
    title: "All Backpacks",
    heading: "Backpacks",
    backpacks: backpacks,
    url: "/backpacks",
    add: "backpack",
  });
}

async function getBackpackById(req, res) {
  const backpackId = req.params.backpack;
  const backpack = await read_db.getBackpackById(backpackId);
  const brand = await read_db.getBrandById(backpack[0].company_id);
  res.render("item", {
    backpack: backpack[0],
    company: brand[0],
  });
}

async function createBackpack(req, res) {
  const { name, company, type, vol } = req.body;
  await create_db.insertBackpack(name, company, type, vol);
  res.redirect("/");
}

async function getCreateBackpack(req, res) {
  res.render("backpack-form");
}

module.exports = {
  getBackpacks,
  getBackpackById,
};
