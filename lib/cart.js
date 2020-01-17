module.exports = function(options) {
  var seneca = this;
  var plugin = 'cart';

  seneca.add({ role: plugin, cmd: 'get' }, get);
  seneca.add({ role: plugin, cmd: 'add' }, add);
  seneca.add({ role: plugin, cmd: 'remove' }, remove);
  seneca.add({ role: plugin, cmd: 'clear' }, clear);

  function get(args, done) {
    return done(null, getCart(args.userId));
  }

  function add(args, done) {
    var cart = getCart(args.userId);

    if (!cart) {
      cart = createCart(args.userId);
    }

    cart.items.push({
      item: args.item,
      restaurantName: args.restaurantName,
      itemName: args.itemName,
      itemPrice: args.itemPrice
    });

    cart.total += +args.itemPrice;
    cart.total.toFixed(2);

    return done(null, cart);
  }

  function remove(args, done) {
    var cart = getCart(args.userId);

    var item = cart.items.filter(function(obj, idx) {
      return (
        obj.item.itemId === args.itemId && obj.restaurantId == args.restaurantId
      );
    })[0];

    if (item) cart.items.splice(item, 1);

    return done(null, cart);
  }

  function clear(args, done) {
    var cart = getCart(args.userId);

    if (!cart) {
      cart = createCart(args.userId);
    }

    cart.items = [];

    done(null, cart);
  }

  function getCart(userId) {
    var cart = carts.filter(function(obj, idx) {
      return obj.userId === userId;
    })[0];

    if (!cart) cart = createCart(userId);

    return cart;
  }

  function createCart(userId) {
    var cart = {
      userId: userId,
      total: 0.0,
      items: []
    };

    carts.push(cart);

    return cart;
  }

  return { name: plugin };
};
