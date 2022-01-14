const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {

  res.render('users', { title: "Test User" })
});

module.exports = router;
