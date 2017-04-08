
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';
import { AutoForm } from 'meteor/aldeed:autoform';

Template.ttcmmcfBootstrapCollectionsCreate.events({
    'click .create-btn': function () {
        $('#ttcmmcfBootstrapCollectionsCreateForm').submit();
    }
});


AutoForm.addHooks('ttcmmcfBootstrapCollectionsCreateForm', {
    onSuccess: function() {
        RouterLayer.go(this.collection.indexPath());
    }
});
