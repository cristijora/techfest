var forever = require('forever-monitor');
var child = new (forever.Monitor)('server/server.js', {
//    max: 3,
  silent: false,
  args: []
});


child.on('exit', function () {
  console.log('server.js has exited after 3 restarts');
});


child.on('restart', function() {
  console.log('Restarting server');
});

child.start();
