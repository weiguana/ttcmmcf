
import { check } from 'meteor/check';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { i18n } from 'anti:i18n';

Meteor.methods({
    accountsCreateUser: function(options) {
        check(options, {
            email: String,
            password: Match.Optional(String),
            name: Match.Optional(String),
            roles: [String]
        });

        if (!Roles.userHasPermission(Meteor.userId(), 'accounts.create')) {
            throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
        }

        const newUser = { email: options.email };
        if (options.password) {
            newUser.password = options.password;
        }
        if (!!options.name) {
            newUser.profile = { name: options.name };
        }

        const userId = Accounts.createUser(newUser);

        Roles.setUserRoles(userId, options.roles);

        return userId;
    },
});
