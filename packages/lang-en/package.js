
Package.describe({
    name: 'ttcmmcf:lang-en',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.2');

    api.use('ecmascript');
    api.use('anti:i18n@0.4.3');
    api.use('softwarerero:accounts-t9n@1.3.6');

    api.imply('anti:i18n');
    api.imply('softwarerero:accounts-t9n');

    api.addFiles('lang-en.js');
    api.addFiles('messages-en.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('ttcmmcf:lang-en');
    api.addFiles('lang-en-tests.js');
});
