const read_db = require("../db/read-queries");
const create_db = require("../db/create-queries");
const update_db = require("../db/update-queries");
const delete_db = require("../db/delete-queries");

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
  res.render("categoryPage", {
    title: brand[0].name,
    heading: brand[0].name + " Backpacks",
    categories: backpacks,
    url: "/backpacks",
    add: "backpack",
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

async function getUpdateBrand(req, res) {
  const brandId = req.params.brand;
  const brand = await read_db.getBrandById(brandId);
  res.render("update-brand-form", {
    id: brandId,
    name: brand[0].name,
    country: brand[0].country,
  });
}

async function updateBrand(req, res) {
  const errors = validationResult(req);
  const brandId = req.params.brand;
  if (!errors.isEmpty()) {
    const brand = await read_db.getBrandById(brandId);
    return res.status(400).render("update-brand-form", {
      id: brandId,
      name: brand[0].name,
      country: brand[0].country,
      errors: errors.array(),
    });
  }

  const { name, country } = req.body;
  const brand = await read_db.getBrandByValues(name, country);
  if (brand?.length !== 0) {
    const brand = await read_db.getBrandById(brandId);
    return res.status(400).render("update-brand-form", {
      id: brandId,
      name: brand[0].name,
      country: brand[0].country,
      errors: [{ msg: "Company already exists." }],
    });
  }
  await update_db.updateBrand(name, country, brandId);
  res.redirect("/brands");
}

async function deleteBrand(req, res) {
  const brandId = req.params.brand;
  const backpacks = await read_db.getBackpackByBrand(brandId);
  const brand = await read_db.getBrandById(brandId);
  const brands = await read_db.getAllBrands();

  if (backpacks?.length !== 0) {
    return res.status(400).render("categoryPage", {
      title: "Brands",
      heading: "Brands",
      categories: brands,
      url: "/brands",
      add: "brand",
      errors: [
        {
          msg: `Cannot delete - BRAND: ${brand[0].name}. Delete all associated backpacks first.`,
        },
      ],
    });
  }
  await delete_db.deleteBrand(brandId);
  res.redirect("/brands");
}

module.exports = {
  getBrands,
  getBackpackByBrand,
  validateBrand,
  createBrand,
  getCreateBrand,
  getUpdateBrand,
  updateBrand,
  deleteBrand,
};
