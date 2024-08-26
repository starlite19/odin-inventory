const read_db = require("../db/read-queries");
const create_db = require("../db/create-queries");

const { body, validationResult } = require("express-validator");

async function getBackpacks(req, res) {
  const backpacks = await read_db.getAllBackpacks();
  // res.render("backpackPage", {
  //   title: "Backpacks",
  //   heading: "All Backpacks",
  //   backpacks: backpacks,
  //   url: "/backpacks",
  //   add: "backpack",
  // });
  res.render("categoryPage", {
    title: "Backpacks",
    heading: "All Backpacks",
    categories: backpacks,
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

const validateBackpack = () => [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a backpack name."),
  body("company")
    .exists({ checkFalsy: true })
    .withMessage("Choose a company from the list."),
  body("type")
    .exists({ checkFalsy: true })
    .withMessage("Choose a backpack type from the list."),
  body("volume")
    .isFloat({ min: 0, max: 70 })
    .withMessage("Volume must be a number between 0 and 70."),
];

async function createBackpack(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const companies = await read_db.getAllBrands();
    const types = await read_db.getAllTypes();
    return res.status(400).render("backpack-form", {
      companies: companies,
      types: types,
      errors: errors.array(),
    });
  }
  const { name, company, type, volume } = req.body;
  const backpack = await read_db.getBackpackByValues(
    name,
    company,
    type,
    volume
  );
  if (backpack?.length !== 0) {
    const companies = await read_db.getAllBrands();
    const types = await read_db.getAllTypes();
    return res.status(400).render("backpack-form", {
      companies: companies,
      types: types,
      errors: [{ msg: "Backpack already exists." }],
    });
  }
  await create_db.insertBackpack(name, company, type, volume);
  res.redirect("/backpacks");
}

async function getCreateBackpack(req, res) {
  const companies = await read_db.getAllBrands();
  const types = await read_db.getAllTypes();
  res.render("backpack-form", { companies: companies, types: types });
}

module.exports = {
  getBackpacks,
  getBackpackById,
  validateBackpack,
  createBackpack,
  getCreateBackpack,
};
