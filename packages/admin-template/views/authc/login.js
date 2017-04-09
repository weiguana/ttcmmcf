
import { AccountsTemplates } from 'meteor/useraccounts:core';

Template.ttcmmcfBootstrapLogin.helpers({
});

Template.ttcmmcfBootstrapLogin.events({
});

Template.ttcmmcfBootstrapLogin.onRendered(function () {
    AccountsTemplates.clearState();
});
