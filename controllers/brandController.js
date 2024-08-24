const db = require("../db/queries");

async function getBrands(req, res) {
  const brands = await db.getAllBrands();
  res.render("categoryPage", {
    title: "Brands",
    heading: "Brands",
    categories: brands,
    url: "/brands",
  });
}

async function getBackpackByBrand(req, res) {
  const brandId = req.params.brand;
  const backpacks = await db.getBackpackByBrand(brandId);
  const brand = await db.getBrandById(brandId);
  res.render("backpackPage", {
    title: brand[0].name,
    heading: brand[0].name + " Backpacks",
    backpacks: backpacks,
    url: "/backpacks",
  });
}

module.exports = {
  getBrands,
  getBackpackByBrand,
};
