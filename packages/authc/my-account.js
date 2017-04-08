
import { ReactiveTemplates } from 'meteor/nicolaslopezj:reactive-templates';
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { i18n } from 'meteor/anti:i18n';

/**
 * Display account settings
 */
ReactiveTemplates.request('myAccount.index');
ReactiveTemplates.request('myAccount.password');
ReactiveTemplates.request('myAccount.profile');

/**
 * Register the route
 */
RouterLayer.route('/admin/my-account', {
    layout: 'layout',
    template: 'myAccount.index',
    name: 'myAccount.index',
    reactiveTemplates: true
});
ttcmmcf.authc.addProtectedRoute('myAccount.index');

/**
 * Allow password change
 */
AccountsTemplates.configure({
    enablePasswordChange: true
});

/**
 * Register the route
 */
RouterLayer.route('/admin/my-account/change-password', {
    layout: 'layout',
    template: 'myAccount.password',
    name: 'myAccount.password',
    reactiveTemplates: true
});
ttcmmcf.authc.addProtectedRoute('myAccount.password');

/**
 * To update the profile
 */
RouterLayer.route('/admin/my-account/profile', {
    layout: 'layout',
    template: 'myAccount.profile',
    name: 'myAccount.profile',
    reactiveTemplates: true
});
ttcmmcf.authc.addProtectedRoute('myAccount.profile');

/**
 * Create the template events account settings
 */
if (Meteor.isClient) {
    /**
     * Register the link
     */
    Tracker.autorun(function () {
        ttcmmcf.links.add({
            identifier: 'myAccount',
            title: (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) || 'Account',
            activeRouteRegex: 'myAccount'
        });
        ttcmmcf.links.add({
            index: 20,
            identifier: 'myAccount-index',
            parent: 'myAccount',
            title: i18n('accounts.myAccount.title'),
            routeName: 'myAccount.index',
            activeRouteRegex: 'myAccount.index'
        });
        ttcmmcf.links.add({
            index: 50,
            identifier: 'myAccount-updateProfile',
            parent: 'myAccount',
            title: i18n('accounts.updateProfile.title'),
            routeName: 'myAccount.profile',
            activeRouteRegex: 'myAccount.profile'
        });
        ttcmmcf.links.add({
            index: 100,
            identifier: 'myAccount-changePassword',
            parent: 'myAccount',
            title: i18n('accounts.changePassword.title'),
            routeName: 'myAccount.password',
            activeRouteRegex: 'myAccount.password'
        });
    });

    AccountsTemplates.configure({
        onSubmitHook: function(error, state) {
            if (state === 'changePwd') {
                RouterLayer.go('admin')
            }
        },
        onLogoutHook: function() {
            const ref = RouterLayer.pathFor('admin.login');
            if (ref.indexOf('http') > -1) {
                Session.set('ttcmmcf_isRedirecting', true);
            }
            window.location.replace(ref);
        }
    });

    ReactiveTemplates.events('myAccount.index', {
        'click .logout': function() {
            // return Meteor.logout();
            return AccountsTemplates.logout();
        }
    });

    ReactiveTemplates.helpers('myAccount.profile', {
        getDoc: function() {
            return Meteor.user();
        },
        getSchema: function() {
            return ttcmmcf.authc.profileSchema;
        }
    });
}
