// Write your package code here!

import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Roles } from 'meteor/nicolaslopezj:roles';

ttcmmcf.accounts = {};

/**
 * Register the account index action
 */
Roles.registerAction('accounts.index', true);

/**
 * Can the user update user users roles?
 */
Roles.registerAction('accounts.update.roles', true);
Roles.registerAction('accounts.update.password', true);
Roles.registerAction('accounts.update.emails', true);
Roles.registerAction('accounts.update.profile', true);
Roles.registerAction('accounts.remove', true);

/**
 * Register the index filter for the accounts.list
 */
Roles.registerHelper('accounts.indexFilter', {});

/**
 * To set the actions for the admin
 */
ttcmmcf.accounts._adminUsersButtons = [];

/**
 * Add buttons to the list of users in the admin
 */
ttcmmcf.accounts.addAdminUsersButton = function(button) {
    Tracker.nonreactive(function () {
        const current = _.findWhere(ttcmmcf.accounts._adminUsersButtons, {
            route: button.route,
            meteorMethod: button.meteorMethod,
        });
        if (current) {
            ttcmmcf.accounts._adminUsersButtons = _.without(ttcmmcf.accounts._adminUsersButtons, current);
        }
    });

    check(button, {
        title: String,
        route: Match.Optional(String),
        meteorMethod: Match.Optional(String),
        shouldShow: Match.Optional(Function),
        onClick: Match.Optional(Function)
    });

    ttcmmcf.accounts._adminUsersButtons.push(button);
};


// Variables exported by this module can be imported by other packages and
// applications. See accounts-tests.js for an example of importing.
export const name = 'accounts';
