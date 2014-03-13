var _ = require('lodash'),
  app = require('../app'),
  async = require('async'),
  game = require('./game'),
  models = [game];

module.exports = function(callback) {
  async.parallel(_.map(models, function(model) {
    return function(callback) {
      model.sync({force: app.isDev}).success(function() {
        callback(null);
      });
    };
  }), function(err, results) {
    callback.call(null);
  });
};