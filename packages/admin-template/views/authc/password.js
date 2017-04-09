
import { AccountsTemplates } from 'meteor/useraccounts:core';

Template.ttcmmcfBootstrapAccountPassword.helpers({
});

Template.ttcmmcfBootstrapAccountPassword.events({
});

Template.ttcmmcfBootstrapAccountPassword.onRendered(function () {
    AccountsTemplates.clearState();
});
