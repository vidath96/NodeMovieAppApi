var express = require('express');
var router = express.Router();

/* GET movie page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Movie' });
});

module.exports = router;
