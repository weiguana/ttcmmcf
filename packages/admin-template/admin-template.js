// Write your package code here!

import { Options } from 'meteor/nicolaslopezj:options';
import { ReactiveTemplates } from 'meteor/nicolaslopezj:reactive-templates';

Options.init('homePath');
Options.init('siteName');

ReactiveTemplates.request('tabs', 'ttcmmcfBootstrapTabs');
ReactiveTemplates.request('adminSidebar');

ReactiveTemplates.set('layout', 'ttcmmcfBootstrapLayout');
ReactiveTemplates.set('outAdminLayout', 'ttcmmcfBootstrapOutAdminLayout');

ReactiveTemplates.set('adminSidebar', 'ttcmmcfBootstrapSidebar');
ReactiveTemplates.set('login', 'ttcmmcfBootstrapLogin');
ReactiveTemplates.set('registerWithInvitation', 'ttcmmcfBootstrapRegisterWithInvitation');

ReactiveTemplates.set('myAccount.index', 'ttcmmcfBootstrapAccountIndex');
ReactiveTemplates.set('myAccount.password', 'ttcmmcfBootstrapAccountPassword');
ReactiveTemplates.set('myAccount.profile', 'ttcmmcfBootstrapAccountProfile');

ReactiveTemplates.set('accounts.index', 'ttcmmcfBootstrapAccountsIndex');
ReactiveTemplates.set('accounts.update', 'ttcmmcfBootstrapAccountsUpdate');
ReactiveTemplates.set('accounts.create', 'ttcmmcfBootstrapAccountsCreate');

ReactiveTemplates.set('configUpdate', 'ttcmmcfBootstrapConfigUpdate');
ReactiveTemplates.set('dictionaryUpdate', 'ttcmmcfBootstrapDictionaryUpdate');

// Set the default entity templates
Options.set('collectionsDefaultIndexTemplate', 'ttcmmcfBootstrapCollectionsIndex');
Options.set('collectionsDefaultCreateTemplate', 'ttcmmcfBootstrapCollectionsCreate');
Options.set('collectionsDefaultUpdateTemplate', 'ttcmmcfBootstrapCollectionsUpdate');
Options.set('collectionsDefaultDeleteTemplate', 'ttcmmcfBootstrapCollectionsDelete');

// Pages
ReactiveTemplates.set('pages.index', 'ttcmmcfBootstrapPagesIndex');
ReactiveTemplates.set('pages.create', 'ttcmmcfBootstrapPagesCreate');
ReactiveTemplates.set('pages.update', 'ttcmmcfBootstrapPagesUpdate');
ReactiveTemplates.set('pages.delete', 'ttcmmcfBootstrapPagesDelete');


// Variables exported by this module can be imported by other packages and
// applications. See admin-template-tests.js for an example of importing.
export const name = 'admin-template';
