const pool = require("./pool");

// READ FUNCTIONS
async function getAllTypes() {
  const { rows } = await pool.query("SELECT * FROM type");
  return rows;
}

async function getAllBackpacks() {
  const { rows } = await pool.query("SELECT * FROM backpack");
  return rows;
}

async function getAllBrands() {
  const { rows } = await pool.query("SELECT * FROM company");
  return rows;
}

async function getAllVolumes() {
  const { rows } = await pool.query("SELECT * FROM volume");
  return rows;
}

async function getBackpackByType(type) {
  const { rows } = await pool.query("SELECT * FROM backpack WHERE type=($1)", [
    type,
  ]);
  return rows;
}

async function getBackpackByBrand(company_id) {
  const { rows } = await pool.query(
    "SELECT * FROM backpack WHERE company_id=($1)",
    [company_id]
  );
  return rows;
}

async function getBackpackByVolume(min_vol, max_vol) {
  const { rows } = await pool.query(
    "SELECT * FROM backpack WHERE volume BETWEEN ($1) AND ($2)",
    [min_vol, max_vol]
  );
  return rows;
}

async function getBackpackById(id) {
  const { rows } = await pool.query("SELECT * FROM backpack WHERE id=($1)", [
    id,
  ]);
  return rows;
}

async function getBrandById(id) {
  const { rows } = await pool.query("SELECT * FROM company WHERE id=($1)", [
    id,
  ]);
  return rows;
}

async function getTypeById(id) {
  const { rows } = await pool.query("SELECT * FROM type WHERE id=($1)", [id]);
  return rows;
}

async function getVolumeById(id) {
  const { rows } = await pool.query("SELECT * FROM volume WHERE id=($1)", [id]);
  return rows;
}

// CREATE FUNCTIONS
async function insertType(type) {
  await pool.query("INSERT INTO type (name) VALUES ($1)", [type]);
}

async function insertBrand(name, country) {
  await pool.query("INSERT INTO company (name, country) VALUES ($1, $2)", [
    name,
    country,
  ]);
}

async function insertBackpack() {}
module.exports = {
  getAllTypes,
  getAllBackpacks,
  getAllBrands,
  getAllVolumes,
  getBackpackByType,
  getBackpackByBrand,
  getBackpackByVolume,
  getBackpackById,
  getBrandById,
  getTypeById,
  getVolumeById,
};

// company
// type
// backpack
// volume
