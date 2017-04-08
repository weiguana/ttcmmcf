
Package.describe({
    name: 'ttcmmcf:attributes',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');

    api.use([
        'ecmascript',
        'check',
        'blaze-html-templates@1.0.5',
        'ttcmmcf:base@0.0.1',
        'aldeed:collection2@2.10.0',
        'aldeed:autoform@5.8.1',
        'momentjs:moment@2.17.1'
    ]);

    api.imply([
        'aldeed:collection2',
        'aldeed:autoform',
    ]);

    api.addFiles([
        'attributes.js'
    ]);

    // Created by attribute
    api.addFiles('created-by/created-by.html', 'client');
    api.addFiles('created-by/created-by.js');

    // Created at attribute
    api.addFiles('created-at/created-at.html', 'client');
    api.addFiles('created-at/created-at.js');

    // Updated by attribute
    api.addFiles('updated-by/updated-by.html', 'client');
    api.addFiles('updated-by/updated-by.js');

    // Updated at attribute
    api.addFiles('updated-at/updated-at.html', 'client');
    api.addFiles('updated-at/updated-at.js');

    api.export('ttcmmcf');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:attributes');
    api.addFiles('attributes-tests.js');
});
