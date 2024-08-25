const read_db = require("../db/read-queries");
const create_db = require("../db/create-queries");

const { body, validationResult } = require("express-validator");

async function getBrands(req, res) {
  const brands = await read_db.getAllBrands();
  res.render("categoryPage", {
    title: "Brands",
    heading: "Brands",
    categories: brands,
    url: "/brands",
    add: "brand",
  });
}

async function getBackpackByBrand(req, res) {
  const brandId = req.params.brand;
  const backpacks = await read_db.getBackpackByBrand(brandId);
  const brand = await read_db.getBrandById(brandId);
  res.render("backpackPage", {
    title: brand[0].name,
    heading: brand[0].name + " Backpacks",
    backpacks: backpacks,
    url: "/backpacks",
  });
}

const validateBrand = () => [
  body("name").trim().isLength({ min: 1 }).withMessage("Enter a brand."),
  body("country")
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage("Country code must be 3 letters.")
    .isUppercase()
    .withMessage("Capitalize all country letters."),
];

async function createBrand(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("brand-form", {
      errors: errors.array(),
    });
  }
  const { name, country } = req.body;
  const brand = await read_db.getBrandByValues(name, country);
  if (brand?.length !== 0) {
    return res.status(400).render("brand-form", {
      errors: [{ msg: "Company already exists." }],
    });
  }
  await create_db.insertBrand(name, country);
  res.redirect("/brands");
}

async function getCreateBrand(req, res) {
  res.render("brand-form");
}

module.exports = {
  getBrands,
  getBackpackByBrand,
  validateBrand,
  createBrand,
  getCreateBrand,
};
