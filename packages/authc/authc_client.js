
import { Injected } from 'meteor/meteorhacks:inject-initial';
import { AccountsTemplates } from 'meteor/useraccounts:core';

/**
 * Fetch the config at the start of the program
 */
ttcmmcf.adminExists = Injected && Injected.obj('adminExists') && Injected.obj('adminExists').exists;
AccountsTemplates.configure({
    forbidClientAccountCreation: !!ttcmmcf.adminExists
});
