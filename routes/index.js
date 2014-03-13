var Game = require('../models/game')

exports.index = function(req, res){
  Game.count().success(function(count) {
    res.render('index', {title: 'Express', gameCount: count});
  });
};