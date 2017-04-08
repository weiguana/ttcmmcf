
Package.describe({
    name: 'ttcmmcf:core',
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
        'ttcmmcf:authc@0.0.1',
        'ttcmmcf:config@0.0.1',
        'ttcmmcf:collections@0.0.1',
        'ttcmmcf:dictionary@0.0.1',
        'ttcmmcf:attributes@0.0.1',
        'ttcmmcf:lang-en@0.0.1',
        'ttcmmcf:lang-zh@0.0.1'
    ]);

    api.imply([
        'ttcmmcf:lang-en',
        'ttcmmcf:lang-zh',
        'ttcmmcf:base',
        'ttcmmcf:authc',
        'ttcmmcf:config',
        'ttcmmcf:collections',
        'ttcmmcf:dictionary',
        'ttcmmcf:attributes',
    ]);

    api.export('ttcmmcf');
});
