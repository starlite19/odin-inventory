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

async function getBackpackByType(type_id) {
  const { rows } = await pool.query(
    "SELECT * FROM backpack WHERE type_id=($1)",
    [type_id]
  );
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

async function getTypeByName(name) {
  const { rows } = await pool.query(
    "SELECT * FROM type WHERE LOWER(name) = LOWER($1)",
    [name]
  );
  return rows;
}

async function getBrandByValues(name, country) {
  const { rows } = await pool.query(
    "SELECT * FROM company WHERE LOWER(name) = LOWER($1) AND country = ($2)",
    [name, country]
  );
  return rows;
}

async function getBackpackByValues(name, company, type, volume) {
  const { rows } = await pool.query(
    "SELECT * FROM backpack WHERE LOWER(name) = LOWER($1) AND company_id = ($2) AND type_id = ($3) AND volume = ($4)",
    [name, company, type, volume]
  );
  return rows;
}

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
  getTypeByName,
  getBrandByValues,
  getBackpackByValues,
};
