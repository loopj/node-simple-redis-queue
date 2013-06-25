events = require "events"

class RedisQueueError extends Error

class RedisQueue extends events.EventEmitter
  constructor: (@conn) ->

  push: (type, payload) ->
    @conn.lpush type, JSON.stringify(payload)

  monitor: (keysToMonitor...) ->
    @conn.brpop keysToMonitor..., 0, (err, replies) =>
      try
        return @emit("error", err) if err?
        return @emit("error", new RedisQueueError("Bad number of replies from redis #{replies.length}")) if replies.length != 2

        @emit "message", replies[0], replies[1]
      finally
        @monitor(keysToMonitor...)

  clear: (keysToClear...) ->
    @conn.del keysToClear...

module.exports = RedisQueue
