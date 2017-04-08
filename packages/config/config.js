// Write your package code here!

import { _ } from 'meteor/underscore';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { Spacebars } from 'meteor/spacebars';

/**
 * Definition of the config object
 */
ttcmmcf.config = {
    collection: new Meteor.Collection('ttcmmcf_config'),
    object: {}
};

/**
 * Allows to set some fields on simple schema
 */
SimpleSchema.extendOptions({
    category: Match.Optional(String),
    public: Match.Optional(Boolean),
    secret: Match.Optional(Boolean),
    name: Match.Optional(String)
});

/**
 * To get reactively if the config is active
 */
ttcmmcf.config._isActiveDependency = new Tracker.Dependency();
ttcmmcf.config._isActive = false;
ttcmmcf.config.isActive = function() {
    this._isActiveDependency.depend();
    return this._isActive;
};

/**
 * Register the action for the permissions
 */
Roles.registerAction('config.update', true);

/**
 * Permissions for the dictionary.
 */
ttcmmcf.config.collection.allow({
    /**
     * No one can insert a config object
     * becouse it only uses one and its created
     * automatically.
     */
    'insert': function(userId, doc) {
        return false;
    },
    /**
     * No one can remove a config object
     * becouse it only uses one.
     */
    'remove': function(userId, doc) {
        return false;
    }
});

ttcmmcf.config.collection.allow({
    'update': function(userId, doc, fields, modifier) {
        return Roles.allow(userId, 'config.update', userId, doc, fields, modifier);
    }
});

ttcmmcf.config.collection.deny({
    'update': function(userId, doc, fields, modifier) {
        return Roles.deny(userId, 'config.update', userId, doc, fields, modifier);
    }
});

/**
 * Function to add a config.
 * This just modifies the schema of the config object
 * and adds the form in the admin panel.
 */
ttcmmcf.config.add = function(name, category, options) {
    const newSchema = (this.collection.simpleSchema() && _.clone(this.collection.simpleSchema()._schema)) || {};

    newSchema[name] = _.extend({
        type: String,
        secret: false,
        label: name,
        public: false,
        category: category,
        name: name
    }, options || {});

    if (newSchema[name].secret) {
        newSchema[name].autoform = {
            type: 'password',
            'data-type': 'secret',
        };
    }

    this.collection.attachSchema(new SimpleSchema(newSchema));

    if (!this._isActive) {
        this._isActive = true;
        this._isActiveDependency.changed();
    }
};

/**
 * Returns the value of the config.
 * If the config doesn't exists it
 * returns the defaultValue
 */
ttcmmcf.config.get = function(path, defaultValue) {
    // Sets empty string to avoid problems on templates
    defaultValue = !defaultValue || defaultValue instanceof Spacebars.kw ? '' : defaultValue;
    return ttcmmcf.helpers.searchObjectWithDots(this.object, path) || defaultValue;
};

/**
 * Returns the public options
 */
ttcmmcf.config.getPublicFields = function() {
    const atts = this.collection.simpleSchema() && _.where(this.collection.simpleSchema()._schema, { public: true });
    return atts && _.pluck(atts, 'name');
};

/**
 * Returns fields that are not public
 */
ttcmmcf.config.getPrivateFields = function() {
    const atts = this.collection.simpleSchema() && _.where(this.collection.simpleSchema()._schema, { public: false });
    return atts && _.pluck(atts, 'name');
};

// Variables exported by this module can be imported by other packages and
// applications. See config-tests.js for an example of importing.
export const name = 'config';
