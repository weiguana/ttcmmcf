
Package.describe({
    name: 'ttcmmcf:admin-template',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');

    api.use([
        'blaze-html-templates@1.0.5',
        'ecmascript',
        'meteor-platform',
        'ttcmmcf:core@0.0.1',
        'ttcmmcf:admin@0.0.1',
        'less',
        'aldeed:autoform@5.8.1',
        'aldeed:tabular@2.1.1',
        'useraccounts:bootstrap@1.14.2',
        'anti:i18n@0.4.3',
    ]);

    api.imply([
        'ttcmmcf:core',
        'ttcmmcf:admin',
        'aldeed:autoform',
        'useraccounts:bootstrap'
    ]);

    api.addFiles([
        'admin-template.js',
        'tabular.js'
    ]);

    api.addFiles([
        'views/layout/layout.html',
        'views/layout/layout.js',
        'views/layout/layout.less',
        'views/sidebar/sidebar.html',
        'views/sidebar/sidebar.less',
        'views/authc/login.html',
        'views/authc/login.js',
        'views/authc/register-with-invitation.html',
        'views/authc/register-with-invitation.js',
        'views/authc/password.html',
        'views/authc/password.js',
        'views/authc/profile.html',
        'views/authc/profile.js',
        'views/accounts/index.html',
        'views/accounts/accounts.less',
        'views/accounts/accounts.html',
        'views/accounts/update.html',
        'views/accounts/create.html',
        'views/config/update.html',
        'views/config/update.js',
        'views/dictionary/update.html',
        'views/dictionary/update.js',
        'views/collections/index.html',
        'views/collections/index.js',
        'views/collections/index.less',
        'views/collections/create.html',
        'views/collections/create.js',
        'views/collections/update.html',
        'views/collections/update.js',
        'views/collections/delete.html',
        'views/pages/index.html',
        'views/pages/create.html',
        'views/pages/update.html',
        'views/pages/delete.html',
        'views/pages/pages.js',
    ], 'client');

    api.export('ttcmmcf');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:admin-template');
    api.addFiles('admin-template-tests.js');
});
