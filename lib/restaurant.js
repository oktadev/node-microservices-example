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

var restaurants = [
  {
    id: '1',
    name: "Joe's Seafood Joint",
    menu: [
      {
        restaurantId: 1,
        itemId: 1,
        name: 'Stuffed Flounder',
        price: '19.99',
        description:
          'Daily Catch Flounder wrapped around Bay Area Crab chunks drizzeled with an Imperial Sauce over rice with asperagus.'
      },
      {
        restaurantId: 1,
        itemId: 2,
        name: 'Stripped Bass',
        price: '17.99',
        description:
          'No better rock fish than that right out of the Chesapeak Bay.  Garnished with Lemon and sided with fried potatoes and fresh green beans.'
      },
      {
        restaurantId: 1,
        itemId: 1,
        name: 'Lobster',
        price: '29.99',
        description:
          'Maine Lobster brought in fresh this morning served with butter and hush puppies.'
      }
    ]
  },
  {
    id: '2',
    name: 'The BBQ Place',
    menu: [
      {
        restaurantId: 2,
        itemId: 1,
        name: 'Pulled Pork',
        price: '12.99',
        description:
          'Slow cooked pork shoulder with our famous vinegar barbeque sauce served with hush puppies and carrots.'
      },
      {
        restaurantId: 2,
        itemId: 2,
        name: 'Smokey Smoked Brisket',
        price: '17.99',
        description:
          'Smoked for 2 whole days in our custom built smoker on premise.  Juicey and tender brisket served with fries and cole slaw.'
      },
      {
        restaurantId: 2,
        itemId: 1,
        name: 'Half Rack of Ribs',
        price: '29.99',
        description:
          'Slathered in barbeque sauce and served with french fries and coleslaw.'
      }
    ]
  },
  {
    id: '3',
    name: 'Sandwiches R Us',
    menu: [
      {
        restaurantId: 3,
        itemId: 1,
        name: 'Tuna Wrap',
        price: '12.99',
        description:
          'Fresh caught Hatteras yellowfin tuna wrapped in a wheat tortilla.  Comes with chips or fries and a fried pickle.'
      },
      {
        restaurantId: 3,
        itemId: 2,
        name: 'BLT',
        price: '10.99',
        description:
          'The classic BLT made with real local bacon from my buddys farm'
      },
      {
        restaurantId: 3,
        itemId: 1,
        name: 'Pigs in a Blanket',
        price: '12.99',
        description:
          'Two mini pancakes as bread, bacon, sauage, and eggs.  Drizzeled in syrup and slathered in butter.'
      }
    ]
  }
];
