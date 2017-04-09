// Write your package code here!

import { i18n } from 'meteor/anti:i18n';
import { T9n } from 'meteor/softwarerero:accounts-t9n';

i18n.setDefaultLanguage('en');
i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');

if (Meteor.isClient) {
    /**
     * Detects and set the language
     */
    detectLanguage = function() {
        let language = window.navigator.userLanguage || window.navigator.language;
        // language = language.split('-')[0];
        // if (language.indexOf('-') < 0) {
        //     language = language + '-'
        // }
        const languages = language.split('-');
        if (languages[0] === 'zh') {
            language = languages[0] + '-' + languages[1].toUpperCase() + '-' + 'null';
        }
        i18n.setLanguage(language);
        T9n.setLanguage(language);
    };

    /**
     * Detects and set the language on startup
     */
    Meteor.startup(function () {
        detectLanguage();
    });
}

// Variables exported by this module can be imported by other packages and
// applications. See lang-en-tests.js for an example of importing.
export const name = 'lang-en';
