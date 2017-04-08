
Package.describe({
    name: 'ttcmmcf:dictionary',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');

    api.use([
        'ecmascript',
        'blaze-html-templates@1.0.5',
        'ttcmmcf:base@0.0.1',
        'aldeed:simple-schema@1.5.3',
        'aldeed:collection2@2.10.0',
    ]);

    api.imply([
        'aldeed:simple-schema',
        'aldeed:collection2'
    ]);

    api.addFiles([
        'dictionary.js'
    ]);

    api.addFiles([
        'dictionary_server.js',
    ], 'server');

    api.addFiles([
        'dictionary_client.js',
    ], 'client');

    api.export('ttcmmcf');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:dictionary');
    api.addFiles('dictionary-tests.js');
});
