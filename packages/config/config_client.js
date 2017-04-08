
import { _ } from 'meteor/underscore';
import { Injected } from 'meteor/meteorhacks:inject-initial';

/**
 * Fetch the config at the start of the program
 */
ttcmmcf.config.object = Injected.obj('ttcmmcf.config');

ttcmmcf.config.getCategories = function() {
    return _.uniq(_.pluck(ttcmmcf.config.collection.simpleSchema()._schema, 'category'));
};
