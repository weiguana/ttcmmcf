
Package.describe({
    name: 'ttcmmcf:config',
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
        'ttcmmcf:lang-en@0.0.1',
        'ttcmmcf:base@0.0.1',
        'aldeed:simple-schema@1.5.3',
        'aldeed:collection2@2.10.0',
        'matb33:collection-hooks@0.8.4',
        'meteorhacks:inject-initial@1.0.4',
    ]);

    api.addFiles([
        'config.js'
    ]);

    api.addFiles([
        'config_server.js'
    ], 'server');

    api.addFiles([
        'config_client.js'
    ], 'client');

    api.export('ttcmmcf');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:config');
    api.addFiles('config-tests.js');
});
