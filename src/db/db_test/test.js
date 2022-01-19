
//PURPOSE OF THIS FILE IS TO RUN ISOLATED TESTS

// Test 1: database connection confirmation
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../../../lib/db.js");
const db = new Pool(dbParams);
db.connect();

//db query; result should be the seed data from seeds/seed.sql for the inventory inventory
db.query(`SELECT * FROM inventory;`).then(data => {
  console.log(data.rows);
});
//End of test (1)