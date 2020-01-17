require('seneca')()
  .use('../lib/cart')
  .listen(10202)