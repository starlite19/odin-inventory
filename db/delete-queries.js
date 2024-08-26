const pool = require("./pool");

// DELETE FUNCTIONS
async function deleteBackpack(backpackId) {
  await pool.query("DELETE FROM backpack WHERE id=($1)", [backpackId]);
}

async function deleteBrand(companyId) {
  await pool.query("DELETE FROM company WHERE id=($1)", [companyId]);
}

async function deleteType(typeId) {
  await pool.query("DELETE FROM type WHERE id=($1)", [typeId]);
}

module.exports = {
  deleteType,
  deleteBrand,
  deleteBackpack,
};
