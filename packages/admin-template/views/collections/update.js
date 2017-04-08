
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';

Template.ttcmmcfBootstrapCollectionsUpdate.events({
    'click .save-btn': function () {
        $('#ttcmmcfBootstrapCollectionsUpdateForm').submit();
    }
});

AutoForm.addHooks('ttcmmcfBootstrapCollectionsUpdateForm', {
    onSuccess: function() {
        RouterLayer.go(this.collection.indexPath());
    }
});
