
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';

AutoForm.addHooks('updateMyProfileForm', {
    onSuccess: function() {
        RouterLayer.go('myAccount.index');
    }
});
