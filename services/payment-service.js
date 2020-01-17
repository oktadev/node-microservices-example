require('seneca')()
  .use('../lib/payment')
  .listen(10203)