require('dotenv').config();
var spawn = require('child_process').spawn
 
var services = ['web-app', 'restaurant-service', 'cart-service', 'payment-service', 'order-service']
 
services.forEach(function (service) {
  var proc = spawn('node', ['./services/' + service + '.js'])
 
  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)
})
