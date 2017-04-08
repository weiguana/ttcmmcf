
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';

Template.ttcmmcfBootstrapPagesIndex.events({
    'click tr': function(event) {
        if (!$(event.target).is('td')) return;
        const dataTable = $(event.target).closest('table').DataTable();
        const rowData = dataTable.row(event.currentTarget).data();
        if (rowData) {
            RouterLayer.go('pages.update', rowData);
        }
    },
});
