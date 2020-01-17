module.exports = function(options) {
  var seneca = this;
  var plugin = 'restaurant';

  seneca.add({ role: plugin, cmd: 'get' }, get);
  seneca.add({ role: plugin, cmd: 'menu' }, menu);
  seneca.add({ role: plugin, cmd: 'item' }, item);

  function get(args, done) {
    if (args.id) {
      return done(null, getResturant(args.id));
    } else {
      return done(null, restaurants);
    }
  }

  function item(args, done) {
    var restaurantId = args.restaurantId;
    var itemId = args.itemId;

    var restaurant = getResturant(restaurantId);
    var desc = restaurant.menu.filter(function(obj, idx) {
      return obj.itemId == itemId;
    })[0];

    var value = {
      item: desc,
      restaurant: restaurant
    };

    return done(null, value);
  }

  function menu(args, done) {
    var menu = getResturant(args.id).menu;
    return done(null, menu);
  }

  function getResturant(id) {
    return restaurants.filter(function(r, idx) {
      return r.id === id;
    })[0];
  }

  return { name: plugin };
};
