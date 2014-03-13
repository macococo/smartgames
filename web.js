var app = require('./app'),
  http = require('http'),
  routes = require('./routes'),
  user = require('./routes/user'),
  migration = require('./models/migration');

app.get('/', routes.index);
app.get('/users', user.list);

migration(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  // jobs
  var itunesSearch = require('./jobs/itunes-search');
  itunesSearch.run(1000 * 60 * 60 * 3);
});