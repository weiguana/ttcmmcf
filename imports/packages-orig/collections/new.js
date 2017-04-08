scorpius.collections.list = {};

/**
 * Collection definition, it overrides Mongo.Collection
 */
scorpius.collection = function(name, options) {
  check(name, String);
  check(options, Object);

  var collection = new Mongo.Collection(name, options);

  options = _.extend({
    name: name,
    routePath: name,
    pluralName: name,
    singularName: name,
    autopublishUpdate: true,
    title: name[0].toUpperCase() + name.slice(1),
  }, options);

  collection = _.extend(collection, options);

  for (var i = 0, N = scorpius.collections.hooks.onCreated.length; i < N; i++) {
    scorpius.collections.hooks.onCreated[i].call(collection);
  }

  collection.helpers({
    _collection: function() {
      return collection;
    },
  });

  scorpius.collections.list[name] = collection;
  return collection;
};
