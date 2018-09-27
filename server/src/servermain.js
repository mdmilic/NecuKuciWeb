// var http = require('http');
// var url = require('url');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api/apiRoutes');
const indexRouter = require('./routes/indexRoute');
const app = express();

// app.set('views', __dirname + '/../../dist');
// app.set('view engine', 'pug');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 8081);

app.use(cors());
app.use(compression()); // Compress all routes
app.use(helmet());
app.use(morgan('combined'));

//----- SUBDOMAIN
const subdomain = require('express-subdomain');
const signupRouter = require('./routes/signupRoute');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//api specific routes
app.use(subdomain('signup', signupRouter));
//---------------

// app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/static', express.static(__dirname + '/../static')); // Serving static with nginix see 03_staticfiles.config
app.use(history({
  verbose: true
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error(req.originalUrl + ' Not Found, route matched ' + req.route);
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error ' + err);
});

app.listen(app.get('port'), function () {
  console.log('Express listening on port ' + app.get('port'));
});

console.log('Server started!');
