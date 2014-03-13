var _ = require('lodash'),
  https = require('https'),
  async = require('async'),
  Job = require('./job.js'),
  Game = require('../models/game');

module.exports = Job.create(function() {
  console.log('start itunes-search job.');

  async.parallel([
    function(callback) {
      Game.findAll().success(function(result) {
        callback(null, result);
      });    
    },
    function(callback) {
      https.get('https://itunes.apple.com/search?term=game&country=jp&lang=ja_jp&limit=200&entity=software', function(res) {
        var body = '';
        res.on('data', function(d) {
          body += d;
        });
        res.on('end', function() {
          callback(null, body);
        });
      })
    }
  ], function(err, results) {
    var map = _.reduce(results[0], function(map, game) {
      map[game.id] = game;
      return map;
    }, {});

    var json = JSON.parse(results[1]);
    _.each(json.results, function(app) {
      var game = map[Number(app.trackId)] || Game.build();
      game.setByApiJson(app);
      game.save();
    });

    console.log('finish itunes-search job.');
  });
});