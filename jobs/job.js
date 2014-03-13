var _ = require('lodash');

var Job = function() {
};
Job.prototype = {
  _timerId: null,
  run: function(interval) {
    this.exec();
    
    this._timerId = setInterval(_.bind(this.exec, this), interval);
  },
  stop: function() {
    clearInterval(this._timerId);
    this._timerId = null;
  },
  exec: function() {
  }
}

module.exports = {
  create: function (execFunction) {
    var job = new Job();
    job.exec = execFunction;
    return job;
  }
}