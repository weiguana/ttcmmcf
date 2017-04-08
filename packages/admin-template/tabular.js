
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { i18n } from 'meteor/anti:i18n';

ttcmmcf.collections.onCreated(function() {
    const self = this;

    // if the collection doesn't has the tabular option, nothing to do here!
    if (!_.has(this, 'tabular')) return;

    const tabularOptions = _.extend({
        name: 'tabular_' + self.name,
        collection: self,
        columns: [
            { data: '_id', title: 'ID' },
        ],
        stateSave: true,
        responsive: true,
        autoWidth: false,
        selector: function(userId) {
            const selectors = Roles.helper(userId, 'collections.' + self.name + '.indexFilter');
            return { $or: selectors };
        },

        language: {
            search: i18n('tabular.search'),
            info: i18n('tabular.info'),
            infoEmpty: i18n('tabular.infoEmpty'),
            lengthMenu: i18n('tabular.lengthMenu'),
            emptyTable: i18n('tabular.emptyTable'),
            paginate: {
                first: i18n('tabular.paginate.first'),
                previous: i18n('tabular.paginate.previous'),
                next: i18n('tabular.paginate.next'),
                last: i18n('tabular.paginate.last'),
            },
        },
    }, this.tabular);

    Tracker.autorun(function() {
        tabularOptions.columns.map(function(column) {
            if (_.isFunction(column.title)) {
                column.langTitle = column.title;
            }

            if (_.isFunction(column.langTitle)) {
                column.title = column.langTitle();
            }

            return column;
        });

        self.tabularTable = new Tabular.Table(tabularOptions);
    });
});
