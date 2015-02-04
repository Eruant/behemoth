var liveServer = require('live-server'),
  port = 3000,
  dir = './build',
  suppressBrowserLaunch = true;

liveServer.start(port, dir, suppressBrowserLaunch);
