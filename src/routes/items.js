const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('add_item')
  });

  router.post("/", (req, res) => {

    //Capture data enter into the add_item form 
    const { name, quantity, description, price, bin, certification } = req.body;
    const query = `INSERT INTO inventory (name, quantity, description, price, bin, certification)
    VALUES ($1, $2, $3, $4, $5, $6 )
    RETURNING *;`;
    const values = [name, quantity, description, price, bin, certification];

    //Add new item to inventory
    db.query(query, values)
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => console.log("query error:", err));
  })

  return router;
}
