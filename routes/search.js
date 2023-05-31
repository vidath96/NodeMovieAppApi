var express = require('express');
var router = express.Router();

const movies = require('../data/movies')
const people = require('../data/people')


function requireQuery(req,res,next){
  const searchTerm = req.query.query
  if(!searchTerm){
    res.json({ msg: 'Query is Required' });
  }else{
    next() 
  }
}

// router.use(requireQuery)

/* GET search page. */
router.get('/', requireQuery, (req, res, next) => {
  res.json({ title: 'Search' });
});


router.get('/movie', (req, res, next) =>{
  const searchTerm = req.query.query

  // res.json({ msg: 'Search Movie' });
  let results = movies.filter((movie) => {
    let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm)
    return found
  })

  res.json({
    results: results
  }) 

});

router.get('/person', requireQuery, (req, res, next) => {
  const searchTerm = req.query.query

  // res.json({ msg: 'Search Person' });
  let results = people.filter((person) => {
    let found = person.name.includes(searchTerm)
    return found
  })

  res.json({results})
});

module.exports = router;
