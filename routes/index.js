var express = require('express');
var router = express.Router();

const movies = require('../data/movies')
// const person = require('../data/people')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/most-popular', function(req, res, next) {
  if(req.query.api_key != 123456789){
      res.json({
        msg: 'Invalid API Key'
      })
  }else{
    const results = movies.filter((movie) => {
      return movie.most_popular
    })
    res.json(results)
  }
});

module.exports = router;
