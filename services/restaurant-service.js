require('seneca')()
  .use('../lib/restaurant')
  .listen(10201)