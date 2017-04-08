
Package.describe({
    name: 'ttcmmcf:authc',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');

    api.use([
        'ecmascript',
        'accounts-base',
        'accounts-password',
        'blaze-html-templates@1.0.5',
        'ttcmmcf:base@0.0.1',
        'ttcmmcf:attributes@0.0.1',
        'useraccounts:core@1.14.2',
        'aldeed:simple-schema@1.5.3',
        'matb33:collection-hooks@0.8.4',
        'meteorhacks:inject-initial@1.0.4',
        'anti:i18n@0.4.3'
    ]);

    api.addFiles([
        'authc.js',
        'login.js',
        'secure-routes.js',
        'my-account.js',
    ]);

    api.addFiles([
        'authc_server.js',
    ], 'server');

    api.addFiles([
        'authc_client.js',
    ], 'client');

    api.export(['ttcmmcf']);
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:authc');
    api.addFiles('authc-tests.js');
});
