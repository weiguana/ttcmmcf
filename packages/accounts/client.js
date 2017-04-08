
import { _ } from 'meteor/underscore';
import { ReactiveTemplates } from 'meteor/nicolaslopezj:reactive-templates';
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';

ReactiveTemplates.helpers('accounts.index', {
    table: function() {
        return ttcmmcf.accounts.indexTabularTable;
    }
});

ReactiveTemplates.events('accounts.index', {
    'click .user-btn-action': function (event, template) {
        const userId = $(event.currentTarget).attr('data-user');
        const user = Meteor.users.findOne(userId);
        const buttons = _.filter(ttcmmcf.accounts._adminUsersButtons, function(value, key, list){
            if (typeof value.shouldShow !== 'function') {
                return true;
            }
            return value.shouldShow(user);
        });
        const buttonIndex = $(event.currentTarget).attr('data-button-index');
        const button = buttons[buttonIndex];
        if (button.meteorMethod) {
            Meteor.call(button.meteorMethod, user);
        } else if (button.onClick) {
            button.onClick(user);
        } else if (button.route) {
            RouterLayer.go(button.route, user);
        }
    },
    'click .send-enrollment-email-btn': function(event, template) {
        const userId = $(event.currentTarget).attr('data-user');
        Meteor.call('adminSendEnrollmentEmail', userId, function(error, response) {
            if (error) {
                console.log(error);
            }
        });
    }
});

ReactiveTemplates.onRendered('accounts.update', function() {
    const userId = RouterLayer.getParam('_id');
    this.subscribe('adminAccountsUpdateRoles', userId);
    Session.set('accounts.update.confirmDelete', false);
});

ReactiveTemplates.helpers('accounts.update', {
    user: function() {
        const userId = RouterLayer.getParam('_id');
        return Meteor.users.findOne(userId);
    },
    collection: function() {
        return Meteor.users;
    },
    emailsSchema: function(){
        return UsersEmailsSchema;
    },
    profileSchema: function() {
        return ttcmmcf.accounts.profileSchema;
    },
    passwordSchema: function(){
        return UsersPasswordSchema;
    },
    roles: function() {
        const allowed = _.union.apply(this, Roles.helper(Meteor.userId(), 'accounts.allowedRoles'));
        const denied = _.union.apply(this, Roles.helper(Meteor.userId(), 'accounts.deniedRoles'));
        return _.difference(allowed, denied);
    },
    hasRole: function(role) {
        const userId = RouterLayer.getParam('_id');
        return Roles.userHasRole(userId, role);
    },
    confirmDelete: function() {
        return Session.get('accounts.update.confirmDelete');
    }
});

ReactiveTemplates.events('accounts.update', {
    'click #btnDeleteUser': function (event, template) {
        Session.set('accounts.update.confirmDelete', true);
    },
    'click #btnConfirmDeleteUser': function(event, template) {
        const userId = RouterLayer.getParam('_id');
        Meteor.call('removeUser', userId, function (error, result) {
            if (error) {
                alert(error.reason);
            } else {
                RouterLayer.go('accounts.index');
            }
        });
    },
    'submit form.roles': function (event, template) {
        const userId = RouterLayer.getParam('_id');
        const roles = [];
        template.$('input[role]').each(function(index, val) {
            const role = $(this).attr('role');
            if ($(this).is(':checked')) {
                roles.push(role);
            }
        });
        Meteor.call('updateRoles', userId, roles, function (error, result) {
            if (error) {
                alert(error.reason);
            }
        });
        return false;
    }
});
