const express = require('express');
const router = express.Router();
const fs = require('fs');
const fastcsv = require('fast-csv');


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM inventory;`)
      .then(data => {
        //storing inventory items array in a variable and writing the data to csv file
        const dataRows = data.rows

        const writeStream = fs.createWriteStream("public/exports/product_data.csv");

        fastcsv
          .write(dataRows, { headers: true })
          .pipe(writeStream)
          .on("finish", function () {
            const file = `${__dirname}/../../public/exports/product_data.csv`;
            res.download(file);
          })
      })
  });

  return router;

}
