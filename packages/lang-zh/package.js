Package.describe({
    name: 'ttcmmcf:lang-zh',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');

    api.use('ecmascript');
    api.use('ttcmmcf:lang-en@0.0.1');

    api.imply('ttcmmcf:lang-en');

    api.addFiles('messages-zh.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:lang-zh');
    api.addFiles('lang-zh-tests.js');
});
