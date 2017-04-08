
import { check } from 'meteor/check';

ttcmmcf.collections.list = {};

/**
 * Collection definition, it overrides Mongo.Collection
 */
ttcmmcf.collection = function(name, options) {
    check(name, String);
    check(options, Object);

    let collection = new Mongo.Collection(name, options);

    options = _.extend({
        name: name,
        routePath: name,
        pluralName: name,
        singularName: name,
        autopublishUpdate: true,
        title: name[0].toUpperCase() + name.slice(1),
    }, options);

    collection = _.extend(collection, options);

    for (let i = 0, N = ttcmmcf.collections.hooks.onCreated.length; i < N; i++) {
        ttcmmcf.collections.hooks.onCreated[i].call(collection);
    }

    collection.helpers({
        _collection: function() {
            return collection;
        },
    });

    ttcmmcf.collections.list[name] = collection;
    return collection;
};
