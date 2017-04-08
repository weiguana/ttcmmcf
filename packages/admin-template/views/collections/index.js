
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';

Template.ttcmmcfBootstrapCollectionsIndex.events({
    'click tr': function(event) {
        if (!$(event.target).is('td')) {

        } return;
        const dataTable = $(event.target).closest('table').DataTable();
        const  rowData = dataTable.row(event.currentTarget).data();
        const collection = rowData._collection();
        if (rowData) {
            if (rowData.canShowUpdate()) {
                const path = collection.updatePath(rowData);
                RouterLayer.go(path);
            }
        }
    }
});

Template.ttcmmcfBootstrapCollectionsIndex.onRendered(function() {
    this.autorun(function () {
        RouterLayer.isActiveRoute('');
        Session.set('ttcmmcfBootstrapCollectionsIndex_showTable', false);
        Meteor.defer(function () {
            Session.set('ttcmmcfBootstrapCollectionsIndex_showTable', true);
        });
    });
});

Template.ttcmmcfBootstrapCollectionsIndex.helpers({
    showTable: function () {
        return Session.get('ttcmmcfBootstrapCollectionsIndex_showTable');
    }
});
