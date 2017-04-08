
import { Roles } from 'meteor/nicolaslopezj:roles';

const subscription = Meteor.subscribe('ttcmmcf_dictionary');

/**
 * Access the dictionary on any template
 */
Template.registerHelper('dict', function(name, defaultValue) {
    return ttcmmcf.dictionary.get(name, defaultValue);
});

/**
 * Is the dictionary subscription ready
 */
ttcmmcf.dictionary.isReady = function() {
    return subscription.ready();
};

/**
 * Is the dictionary subscription ready for templates
 */
Template.registerHelper('dictionaryReady', function() {
    return subscription.ready();
});

ttcmmcf.dictionary.availableCategories = function() {
    return _.union.apply(this, Roles.helper(Meteor.userId(), 'dictionary.allowedCategories'));
};
