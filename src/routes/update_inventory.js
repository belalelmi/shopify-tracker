const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.query.id
    db.query('SELECT * FROM inventory WHERE id = $1', [id])
      .then(data => {
        const item = data.rows[0];
        res.render('update_inventory', { item })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  router.post("/:id", (req, res) => {
    const id = req.params.id
    const { name, quantity, description, price, bin, certification } = req.body;
    const query = `UPDATE inventory SET name = $1, quantity = $2, description = $3, price = $4, bin = $5, certification = $6 
    WHERE id = $7`;

    console.log("HERE: ", id, price)

    const values = [name, quantity, description, price, bin, certification, id];
    db.query(query, values)
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        return console.log("query error:", err);
      });
  })
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM inventory WHERE id = $1;`;

    db.query(query, [id])
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        return console.log("query error:", err);
      });
  })

  return router;
}
