module.exports = function (options) {
  var seneca = this
  var plugin = 'payment'

  seneca.add({ role: plugin, cmd: 'pay' }, pay)

  function pay(args, done) {   
      //TODO integrate with your credit card vendor     
      done(null, { success: true });
  }

  return { name: plugin };
}
