
Package.describe({
    name: 'ttcmmcf:accounts',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');

    api.use([
        'accounts-base',
        'accounts-password',
        'blaze-html-templates@1.0.5',
        'ecmascript',
        'ttcmmcf:base@0.0.1',
        'ttcmmcf:attributes@0.0.1',
        'ttcmmcf:authc@0.0.1',
        'anti:i18n@0.4.3'
    ]);

    api.addFiles([
        'accounts.js',
        'admin.js',
        'create/admin.js',
        'create/invite.js'
    ]);

    api.addFiles([
        'server.js',
        'create/server.js'
    ], 'server');

    api.addFiles([
        'client.js'
    ], 'client');

    api.export(['ttcmmcf']);
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:accounts');
    api.addFiles('accounts-tests.js');
});
