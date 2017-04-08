
Package.describe({
    name: 'ttcmmcf:admin',
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
        'anti:i18n@0.4.3',
        'ttcmmcf:core@0.0.1'
    ]);

    api.addFiles([
        'admin.js',
        'config.js',
        'collections.js',
        'dictionary.js'
    ]);
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:admin');
    api.addFiles('admin-tests.js');
});
