var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

var indexRouter = require('./routes/index');
var movieRouter = require('./routes/movie');
var searchRouter = require('./routes/search');

// var usersRouter = require('./routes/users');

var app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));

//checking api token valid
app.use((req, res, next) => {
    if (req.query.api_key != 123456789) {
        res.status(401)
        res.json({
            msg: 'Invalid API Key'
        })
    } else {
        next()
    }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movie', movieRouter);
app.use('/search', searchRouter);
// app.use('/users', usersRouter);

module.exports = app;
