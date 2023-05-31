var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails')

function requireJSON(req,res,next){
  if(!req.is('application/json')){
    res.json({
      msg: "Request content type must be application/json"
    }) 
  }else{
    next() 
  }
}

router.param(('movieId'),(req,res,next) => {
  console.log("Someone used a movie id on route call.")
  next()
})

/* GET movie page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Movie' });
});

router.get('/top_rated',(req,res,next) => {
  let page = req.query.page
  if(page === undefined){page = 1}

  let results = movieDetails.sort((a,b) => {
    // console.log( movie.id,movieId)
    return b.vote_average - a.vote_average
  })

  const sliceLimit = (page-1)*20
  results = results.slice(sliceLimit,sliceLimit+19)

  if(!results){
    res.json({
      msg: "Movie not reated.",
    }) 
  }else{
    res.json({
      page: page,
      results: results
    }) 
  }
})

router.get('/:movieId',(req,res,next) => {
  const movieId = req.params.movieId

  // if(req.query.api_key != 123456789){
  //   res.json({
  //     msg: 'Invalid API Key'
  //   })
  // }else{
    let results = movieDetails.find((movie) => {
      console.log( movie.id,movieId)
      return movie.id == Number(movieId)
    })
    if(!results){
      res.json({
        msg: "Movie ID doesn't match our records.",
        production_companies:[],
      }) 
    }else{
      res.json(results) 
    }
  // }
})


router.post('/:movieId/rating', requireJSON, (req,res,next) => {
  const movieId = req.params.movieId
  const userRating = req.body.value
  if((userRating < .5) || (userRating > 10)){
    res.json({
      msg: "Rating must be between 0.5 and 10.",
    })
  }else{
    res.status(200)
    res.json({
      status_code:200,
      msg: "Thank you for submitting your rating.",
    })

  }
  // res.render('single-movie',{parseData: parseData})
})

router.delete('/:movieId/rating', requireJSON, (req,res,next) => {
  const movieId = req.params.movieId
  res.json({
    msg: `Movie id ${movieId}, Rating has been deleted. `,
  })
})


module.exports = router;
