// Write your package code here!

import { Roles } from 'meteor/nicolaslopezj:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Spacebars } from 'meteor/spacebars';

/**
 * Creates the dictionary mongo collection
 */
ttcmmcf.dictionary = new Mongo.Collection('dictionary');

/**
 * To get reactively if the dictionary is active
 */
ttcmmcf.dictionary._isActiveDependency = new Tracker.Dependency();
ttcmmcf.dictionary._isActive = false;
ttcmmcf.dictionary.isActive = function() {
    this._isActiveDependency.depend();
    return this._isActive;
};

/**
 * Register dictionary actions and helpers for roles
 */
Roles.registerAction('dictionary.update', true);
Roles.registerHelper('dictionary.allowedCategories', function() {
    return ttcmmcf.dictionary.simpleSchema()._firstLevelSchemaKeys;
});

/**
 * Dictionary permissions
 */
ttcmmcf.dictionary.deny({
    /**
     * No one can insert a dicionary object
     * becouse it only uses one and its created
     * automatically
     */
    'insert': function(userId, doc) {
        return true;
    },
    /**
     * No one can remove a dicionary object
     * becouse it only uses one.
     */
    'remove': function(userId, doc) {
        return true;
    }
});

ttcmmcf.dictionary.allow({
    'update': function(userId, doc, fields, modifier) {
        return Roles.allow(userId, 'dictionary.update', userId, doc, fields, modifier);
    }
});

ttcmmcf.dictionary.deny({
    'update': function(userId, doc, fields, modifier) {
        return Roles.deny(userId, 'dictionary.update', userId, doc, fields, modifier);
    }
});

/**
 * Only allow to edit allowed categories
 * If is set to false, can update all fields
 */
ttcmmcf.dictionary.deny({
    'update': function (userId, doc, fields, modifier) {
        const allowedFields = _.union.apply(this, Roles.helper(Meteor.userId(), 'dictionary.allowedCategories'));
        if (allowedFields === false && _.difference(fields, allowedFields).length > 0) {
            return true;
        }
    }
});

/**
 * Function to add a definition to the dictionary.
 * This just modifies the schema of the dictionary object
 * and adds the form in the admin.
 */
ttcmmcf.dictionary.addDefinition = function(name, category, attribute) {
    const newSchema = (this.simpleSchema() && _.clone(this.simpleSchema()._schema)) || {};

    newSchema[category] = newSchema[category] || {
            type: Object,
            optional: true
        };

    newSchema[category + '.' + name] = _.extend({
        optional: true
    }, attribute);

    this.attachSchema(new SimpleSchema(newSchema));

    if (!this._isActive) {
        this._isActive = true;
        this._isActiveDependency.changed();
    }
};

/**
 * Returns the value of the definition.
 * If the definition doesn't exists it
 * returns the defaultValue
 */
ttcmmcf.dictionary.get = function(path, defaultValue) {
    // Sets empty string to avoid problems on templates
    defaultValue = !defaultValue || defaultValue instanceof Spacebars.kw ? undefined : defaultValue;

    if (!defaultValue && ttcmmcf.dictionary.simpleSchema()) {
        const def = ttcmmcf.dictionary.simpleSchema()._schema[path];
        if (def && _.has(def, 'defaultValue')) {
            defaultValue = _.isFunction(def.defaultValue) ? def.defaultValue() : def.defaultValue;
        }
    }

    const dictionaryId = Meteor.isServer && process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID }: {};
    const dictionary = this.findOne(dictionaryId);
    return ttcmmcf.helpers.searchObjectWithDots(dictionary, path) || defaultValue;
};

// Variables exported by this module can be imported by other packages and
// applications. See dictionary-tests.js for an example of importing.
export const name = 'dictionary';
