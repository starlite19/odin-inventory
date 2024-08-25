const read_db = require("../db/read-queries");
const create_db = require("../db/create-queries");

const { body, validationResult } = require("express-validator");

async function getTypes(req, res) {
  const types = await read_db.getAllTypes();
  res.render("categoryPage", {
    title: "Types",
    heading: "Types",
    categories: types,
    url: "/types",
    add: "type",
  });
}

async function getBackpackByType(req, res) {
  const typeId = req.params.type;
  const type = await read_db.getTypeById(typeId);
  const backpacks = await read_db.getBackpackByType(type[0].name);
  res.render("backpackPage", {
    title: type[0].name,
    heading: type[0].name + " Backpacks",
    backpacks: backpacks,
    url: "/backpacks",
  });
}

const validateType = () =>
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a type.")
    .custom(async (value) => {
      const type = await read_db.getTypeByName(value);
      if (type?.length !== 0) {
        throw new Error("Type already exists.");
      }
    });

async function createType(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("type-form", {
      errors: errors.array(),
    });
  }
  const { name } = req.body;
  await create_db.insertType(name);
  res.redirect("/types");
}

async function getCreateType(req, res) {
  res.render("type-form");
}

module.exports = {
  getTypes,
  getBackpackByType,
  validateType,
  createType,
  getCreateType,
};
