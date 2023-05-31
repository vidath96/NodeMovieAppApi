var express = require('express');
var router = express.Router();

const movies = require('../data/movies')
// const person = require('../data/people')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/most-popular', function(req, res, next) {
  let page = req.query.page
  if(page === undefined){page = 1}
  // if(req.query.api_key != 123456789){
  //     res.json({
  //       msg: 'Invalid API Key'
  //     })
  // }else{
    let results = movies.filter((movie) => {
      return movie.most_popular
    })
    // results = results.slice(0,19)
    const sliceStart = (page-1)*20
    const sliceEnd = (page-1)*20+19
    results = results.slice(sliceStart,sliceEnd)

    res.json({
      page: page,
      results: results
    }) 
  // }
});

module.exports = router;
