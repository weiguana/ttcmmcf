
import { _ } from 'meteor/underscore';
import { ReactiveTemplates } from 'meteor/nicolaslopezj:reactive-templates';
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';
import { i18n } from 'meteor/anti:i18n';

/**
 * Init the template name variable
 */
ReactiveTemplates.request('configUpdate');

/**
 * Register the route
 */
RouterLayer.route('/admin/config', {
    layout: 'layout',
    template: 'configUpdate',
    name: 'config.update',
    reactiveTemplates: true
});

/**
 * Ensure user is logged in
 */
ttcmmcf.authc.addProtectedRoute('config.update');

/**
 * Register the link
 */
if (Meteor.isClient) {
    Tracker.autorun(function () {
        if (!ttcmmcf.config.isActive()) return;
        ttcmmcf.links.add({
            index: 100,
            identifier: 'config-update',
            title: i18n('config.update.title'),
            routeName: 'config.update',
            activeRouteRegex: 'config',
            permission: 'config.update'
        });
    });
}

/**
 * Create the template helpers for a dictionary
 */
if (Meteor.isClient) {
    ReactiveTemplates.onCreated('configUpdate', function() {
        this.subscribe('ttcmmcf_config');
    });
    ReactiveTemplates.onRendered('configUpdate', function() {
        const categories = _.uniq(_.pluck(ttcmmcf.config.collection.simpleSchema()._schema, 'category'));
        const defaultCategory = categories && categories[0];
        Session.set('configUpdateCurrentCategory', defaultCategory);
    });

    ReactiveTemplates.events('configUpdate', {
        'click [data-category]': function(event) {
            const newCategory = $(event.currentTarget).attr('data-category');
            Session.set('configUpdateCurrentCategory', newCategory);
        }
    });

    ReactiveTemplates.helpers('configUpdate', {
        getDoc: function() {
            return ttcmmcf.config.collection.findOne();
        },
        getFields: function() {
            const currentCategory = Session.get('configUpdateCurrentCategory');
            return _.pluck(_.where(ttcmmcf.config.collection.simpleSchema()._schema, { category: currentCategory }), 'name');
        },
        getCategories: function() {
            return _.uniq(_.pluck(ttcmmcf.config.collection.simpleSchema()._schema, 'category'));
        }
    });
}
