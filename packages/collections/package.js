Package.describe({
  name: 'ttcmmcf:collections',
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
        'underscore',
        'ttcmmcf:base@0.0.1',
        'aldeed:simple-schema@1.5.3',
        'aldeed:collection2@2.10.0',
        'dburles:collection-helpers@1.1.0',
    ]);

    api.imply([
        'aldeed:simple-schema',
        'aldeed:collection2',
        'dburles:collection-helpers'
    ]);

    api.addFiles([
        'collections.js',
        'new.js',
        'permissions.js',
        'admin.js',
    ]);

    api.addFiles([
        'publications.js',
    ], 'server');

    api.addFiles([
        'collections_client.js'
    ], 'client');

    api.export('ttcmmcf');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ttcmmcf:collections');
  api.mainModule('collections-tests.js');
});
