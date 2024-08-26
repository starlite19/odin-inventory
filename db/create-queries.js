const pool = require("./pool");

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

async function insertBackpack(name, company_id, type_id, vol) {
  await pool.query(
    "INSERT INTO backpack (name, company_id, type_id, volume) VALUES ($1, $2, $3, $4)",
    [name, company_id, type_id, vol]
  );
}

module.exports = {
  insertType,
  insertBrand,
  insertBackpack,
};
