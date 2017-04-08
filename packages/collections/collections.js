// Write your package code here!

import { Options } from 'meteor/nicolaslopezj:options';

/**
 * Init the entities variable
 */
ttcmmcf.collections = {};

ttcmmcf.collections.hooks = {
    onCreated: [],
};

ttcmmcf.collections.onCreated = function(cb) {
    this.hooks.onCreated.push(cb);
};

/**
 * Request the default templates using options
 */
Options.init('collectionsDefaultIndexTemplate');
Options.init('collectionsDefaultCreateTemplate');
Options.init('collectionsDefaultUpdateTemplate');
Options.init('collectionsDefaultDeleteTemplate');

// Variables exported by this module can be imported by other packages and
// applications. See collections-tests.js for an example of importing.
export const name = 'collections';
