var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Search' });
});

module.exports = router;
