module.exports = function(options) {
  var seneca = this;
  var plugin = 'order';

  seneca.add({ role: plugin, cmd: 'placeOrder' }, placeOrder);

  function placeOrder(args, done) {
    var orders = packageOrders(args.cart);

    for (var i = 0; i < orders.length; i++) {
      sendOrder(orders[i]);
    }

    done(null, { success: true, orders: orders });
  }

  function packageOrders(cart) {
    orders = [];

    for (var i = 0; i < cart.items.length; i++) {
      var item = cart.items[i];
      var order = orders.filter(function(obj, idx) {
        obj.restaurantId == item.restaurantId;
      })[0];

      if (!order) {
        order = {
          restaurantId: item.restaurantId,
          items: [item]
        };

        orders.push(order);
      } else {
        order.items.push(item);
      }
    }

    return orders;
  }

  function sendOrder(order) {
    //TODO integrate into your restaurants
    return true;
  }

  return { name: plugin };
};
