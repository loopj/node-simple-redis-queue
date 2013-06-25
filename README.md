Simple Redis Queue for Node.js
==============================

Super simple wrapper for redis `lpush` and `brpop` commands for basic queue
processing and multiple queue support.


Usage
-----

```coffee
// Require the module
RedisQueue = require("simple-redis-queue");

// Construct a queue with a redis connection
myQueue = new RedisQueue(redisCon);

// Publish to the queue
myQueue.push("queueName", "body string or object");

// Listen for new messages
myQueue.on("message", function (queueName, payload) {
    // Do something with the message
});

// Listen for errors
myQueue.on("error", function (error) {
    console.error(error);
});

// Start monitoring this queue
myQueue.monitor("queueName");
```