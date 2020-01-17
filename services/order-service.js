require('seneca')()
  .use('../lib/order')
  .listen(10204)
