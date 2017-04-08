
import { _ } from 'meteor/underscore';
import { ReactiveTemplates } from 'meteor/nicolaslopezj:reactive-templates';
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { i18n } from 'meteor/anti:i18n';

/**
 * Init the template name variable
 */
ReactiveTemplates.request('dictionaryUpdate');

/**
 * Register the route
 */
RouterLayer.route('/admin/dictionary', {
    layout: 'layout',
    template: 'dictionaryUpdate',
    name: 'dictionary.update',
    reactiveTemplates: true
});

/**
 * Ensure user is logged in
 */
ttcmmcf.authc.addProtectedRoute('dictionary.update');

/**
 * Register the link
 */
Tracker.autorun(function () {
    if (!ttcmmcf.dictionary.isActive() || Meteor.isServer) return;

    ttcmmcf.links.add({
        index: 10,
        identifier: 'dictionary-update',
        title: i18n('dictionary.update.title'),
        routeName: 'dictionary.update',
        activeRouteRegex: 'dictionary',
        permission: 'dictionary.update',
    });
});

/**
 * Create the template helpers for a dictionary
 */

if (Meteor.isClient) {

    ReactiveTemplates.onRendered('dictionaryUpdate', function() {
        const defaultCategory = _.first(_.union.apply(this, Roles.helper(Meteor.userId(), 'dictionary.allowedCategories')));
        Session.set('dictionaryUpdateCurrentCategory', defaultCategory);
    });

    ReactiveTemplates.events('dictionaryUpdate', {
        'click [data-category]': function(event) {
            const newCategory = $(event.currentTarget).attr('data-category');
            Session.set('dictionaryUpdateCurrentCategory', newCategory);
        }
    });

    ReactiveTemplates.helpers('dictionaryUpdate', {
        getDoc: function() {
            return ttcmmcf.dictionary.findOne();
        },
        currentCategory: function() {
            return Session.get('dictionaryUpdateCurrentCategory');
        },
        getCategories: function() {
            return _.union.apply(this, Roles.helper(Meteor.userId(), 'dictionary.allowedCategories'));
        }
    });
}
