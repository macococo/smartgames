
/**
 * Module dependencies.
 */

var express = require('express'),
  logfmt = require("logfmt"),
  path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(logfmt.requestLogger());

app.isDev = 'development' == app.get('env');

// development only
if (app.isDev) {
  app.use(express.errorHandler());
}

module.exports = app;