const { Pool } = require("pg");
const { connectionString } = require("pg/lib/defaults");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
