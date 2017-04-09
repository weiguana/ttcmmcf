
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';
import { AutoForm } from 'meteor/aldeed:autoform';

AutoForm.addHooks('updateMyProfileForm', {
    onSuccess: function() {
        RouterLayer.go('myAccount.index');
    }
});
