const express = require('express');
const router = express.Router();

// routes
router.get('/', (req, res) => {
  res.render('article');
});

module.exports = router;
