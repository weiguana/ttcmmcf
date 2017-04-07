Package.describe({
    name: 'ttcmmcf:base',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');
    api.use([
        'ecmascript',
        'meteor-base',
        'mongo',
        'standard-minifiers',
        'underscore',
        'check',
        'tracker',
        'session',
        'spacebars@1.0.13',
        'blaze-html-templates@1.0.5',
        'nicolaslopezj:options@1.0.1',
        'nicolaslopezj:reactive-templates@1.2.1',
        'nicolaslopezj:roles@2.6.2',
        'nicolaslopezj:router-layer@0.0.11',
        'aldeed:simple-schema@1.5.3',
        'aldeed:collection2@2.10.0',
        'ttcmmcf:lang-en@0.0.1',
        'ttcmmcf:lang-zh@0.0.1'
    ]);

    api.imply([
        'tracker',
        'session',
        'underscore',
        'check',
        'nicolaslopezj:router-layer',
        'nicolaslopezj:options',
        'nicolaslopezj:reactive-templates',
        'nicolaslopezj:roles',
        'ttcmmcf:lang-en',
        'ttcmmcf:lang-zh'
    ]);

    api.addFiles([
        'base.js',
        'helpers.js',
        'home-route.js',
        'layouts.js',
    ]);

    api.addFiles([
        'helpers_client.js',
        'links.js'
    ], 'client');

    api.export('ttcmmcf');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:base');
    api.mainModule('base-tests.js');
});
