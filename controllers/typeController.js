const read_db = require("../db/read-queries");
const create_db = require("../db/create-queries");
const update_db = require("../db/update-queries");
const delete_db = require("../db/delete-queries");

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
  const backpacks = await read_db.getBackpackByType(typeId);
  res.render("categoryPage", {
    title: type[0].name,
    heading: type[0].name + " Backpacks",
    categories: backpacks,
    url: "/backpacks",
    add: "backpack",
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

async function getUpdateType(req, res) {
  const typeId = req.params.type;
  const type = await read_db.getTypeById(typeId);
  res.render("update-type-form", { id: typeId, name: type[0].name });
}

async function updateType(req, res) {
  const errors = validationResult(req);
  const typeId = req.params.type;
  if (!errors.isEmpty()) {
    const type = await read_db.getTypeById(typeId);
    return res.status(400).render("update-type-form", {
      id: typeId,
      name: type[0].name,
      errors: errors.array(),
    });
  }
  const { name } = req.body;
  await update_db.updateType(name, typeId);
  res.redirect("/types");
}

async function deleteType(req, res) {
  const typeId = req.params.type;
  const type = await read_db.getTypeById(typeId);
  const backpacks = await read_db.getBackpackByType(typeId);
  const types = await read_db.getAllTypes();

  if (backpacks?.length !== 0) {
    return res.status(400).render("categoryPage", {
      title: "Types",
      heading: "Types",
      categories: types,
      url: "/types",
      add: "type",
      errors: [
        {
          msg: `Cannot delete - TYPE: ${type[0].name}. Delete all associated backpacks first.`,
        },
      ],
    });
  }
  await delete_db.deleteType(typeId);
  res.redirect("/types");
}

module.exports = {
  getTypes,
  getBackpackByType,
  validateType,
  createType,
  getCreateType,
  getUpdateType,
  updateType,
  deleteType,
};
