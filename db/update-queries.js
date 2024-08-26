const pool = require("./pool");

// UPDATE FUNCTIONS
async function updateType(name, id) {
  await pool.query("UPDATE type SET name = ($1) WHERE id = ($2)", [name, id]);
}

async function updateBrand(name, country, id) {
  await pool.query(
    "UPDATE company SET name = ($1), country = ($2) WHERE id = ($3)",
    [name, country, id]
  );
}

async function updateBackpack(name, company, type, volume, id) {
  await pool.query(
    "UPDATE backpack SET name = ($1), company_id = ($2), type_id = ($3), volume = ($4) WHERE id = ($5)",
    [name, company, type, volume, id]
  );
}

module.exports = {
  updateType,
  updateBrand,
  updateBackpack,
};
