var RedisQueue, RedisQueueError,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

RedisQueueError = (function(_super) {

  __extends(RedisQueueError, _super);

  function RedisQueueError() {
    return RedisQueueError.__super__.constructor.apply(this, arguments);
  }

  return RedisQueueError;

})(Error);

RedisQueue = (function() {

  function RedisQueue(conn) {
    this.conn = conn;
  }

  RedisQueue.prototype.publish = function(type, payload) {
    return this.conn.lpush(type, JSON.stringify(payload));
  };

  RedisQueue.prototype.monitor = function() {
    var cb, keysToMonitor, _i, _ref,
      _this = this;
    keysToMonitor = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), cb = arguments[_i++];
    return (_ref = this.conn).brpop.apply(_ref, __slice.call(keysToMonitor).concat([0], [function(err, replies) {
      try {
        if (err != null) {
          return cb(err);
        }
        if (replies.length !== 2) {
          return cb(new RedisQueueError("Bad number of replies from redis " + replies.length));
        }
        return cb(null, replies[0], JSON.parse(replies[1]));
      } finally {
        _this.monitor(cb);
      }
    }]));
  };

  RedisQueue.prototype.clear = function() {
    var keysToClear, _ref;
    keysToClear = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = this.conn).del.apply(_ref, keysToClear);
  };

  return RedisQueue;

})();

module.exports = RedisQueue;
